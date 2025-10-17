import cv2
import time
import os
import json
import base64
from flask import Flask, Response, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO

with open("current_model.txt", "r") as f:
    model_name = f.read().strip()

model = YOLO(f"models/{model_name}", task="detect")

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

current_video_path = None
streaming = False
cap = None
violations_queue = []

def generate_frames(video_source=0):
	global cap, streaming, violations_queue
	cap = cv2.VideoCapture(video_source)
	prev_time = time.time()

	while streaming and cap.isOpened():
		success, frame = cap.read()
		if not success:
			break

		results = model(frame, stream=True, imgsz=480, conf=0.5, verbose=False)

		for r in results:
			for box in r.boxes:
				x1, y1, x2, y2 = map(int, box.xyxy[0])
				conf = float(box.conf[0])
				cls = int(box.cls[0])
				label = model.names[cls]
                
				if conf < 0.4:
					continue

				crop_img = frame[y1:y2, x1:x2]
				ret_crop, buffer_crop = cv2.imencode('.jpg', crop_img, [cv2.IMWRITE_JPEG_QUALITY, 70])
				crop_bytes = buffer_crop.tobytes()
				crop_base64 = base64.b64encode(crop_bytes).decode('utf-8')
				violation_data = {
					"violation_type": label,
					"accuracy": conf,
					"timestamp": int(time.time() * 1000),
					"crop_image": crop_base64 
				}
				violations_queue.append(violation_data)
				
				cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
				cv2.putText(frame, f"{label} {conf:.2f}", (x1, y1 - 10),
							cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

		curr_time = time.time()
		fps = 1.0 / (curr_time - prev_time)
		prev_time = curr_time
		cv2.putText(frame, f"FPS: {fps:.2f}", (10, 30),
					cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)

		ret, buffer = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 70])
		frame_bytes = buffer.tobytes()
		yield (b'--frame\r\n'
			b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

	if cap:
		cap.release()
		cap = None

@app.route('/')
def index():
    return "YOLO Stream API Ready"

@app.route('/start', methods=['POST'])
def start_stream():
    global current_video_path, streaming, cap
    streaming = False
    if cap is not None:
        cap.release()
        cap = None

    if 'file' in request.files:
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No filename"}), 400
        save_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(save_path)
        current_video_path = save_path
    else:
        data = request.get_json(silent=True) or {}
        if data.get("video") is None:
            current_video_path = 0
        else:
            return jsonify({"error": "Invalid request"}), 400
    
    streaming = True
    return jsonify({"status": "Stream started"}), 200

@app.route('/stop', methods=['POST'])
def stop_stream():
    global streaming, cap
    streaming = False
    if cap is not None:
        cap.release()
        cap = None
    return jsonify({"status": "Stream stopped"}), 200

@app.route('/video')
def video_feed():
    if not streaming:
        return jsonify({"error": "No active stream"}), 400
    return Response(generate_frames(current_video_path),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/violation_stream')
def violation_stream():
    def event_stream():
        while True:
            if violations_queue:
                data = json.dumps({"violations": violations_queue.copy()})
                violations_queue.clear()
                yield f"data: {data}\n\n"
            time.sleep(0.2)
    return Response(event_stream(), mimetype='text/event-stream')

def get_current_model():
    with open('current_model.txt', 'r') as f:
        current_model = f.read()
    print(current_model)
    return current_model
        
@app.route('/models')
def get_model():
    model = ['best.onnx', 'latest.onnx']
    print(model)
    current_model = get_current_model()
    return jsonify({
        'models': model,
        'current_model': current_model
    })

@app.route('/change_model', methods=['POST'])
def change_model():
	global model
	data = request.get_json()
	name = data.get('model') if data else None
	print(name)
     
	try:
		if(name):
			model = YOLO(f'models/{name}', task="detect")
			with open('current_model.txt', 'w') as f:
				f.write(name)
                    
	except Exception as e:
		return jsonify({'error': str(e)}), 500
		
	
	return jsonify({'status': 'success', 'current_model': name})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
