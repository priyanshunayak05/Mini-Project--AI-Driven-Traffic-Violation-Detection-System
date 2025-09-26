import easyocr
import re
import sys
import json

# Initialize EasyOCR once
reader = easyocr.Reader(['en'])

def correct_ocr_errors(text):
    corrections = {
        'O': '0', 'I': '1', 'Z': '2',
        'B': '8', 'S': '5',
    }
    return ''.join(corrections.get(ch, ch) for ch in text)

def extract_license_plate(image_path):
    results = reader.readtext(image_path)
    best_plate, best_confidence = None, 0.0
    
    for _, text, confidence in results:
        cleaned_text = re.sub(r'[^A-Z0-9]', '', text.upper())
        cleaned_text = correct_ocr_errors(cleaned_text)
        
        if re.match(r'^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$', cleaned_text):
            if confidence > best_confidence:
                best_plate, best_confidence = cleaned_text, confidence
    
    if best_plate:
        return best_plate, round(best_confidence * 100, 2)
    else:
        return None, None


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"plate": None, "confidence": None}))
        sys.exit(1)

    img = sys.argv[1]
    plate, acc = extract_license_plate(img)
    if plate:
        print(json.dumps({"plate": plate, "confidence": acc}))
    else:
        print(json.dumps({"plate": None, "confidence": None}))
