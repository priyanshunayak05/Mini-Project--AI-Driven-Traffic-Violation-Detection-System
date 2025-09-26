// server.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const { exec } = require("child_process");

const app = express();
const PORT = 3000;

// configure multer to save uploads in "uploads" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// POST /upload route
app.post("/upload", upload.single("image"), (req, res) => {
    const imagePath = req.file.path;

    exec(`python D:/email/ocr/ocr_script.py ${imagePath}`, (err, stdout, stderr) => {
        if (err) {
            console.error(stderr);
            return res.status(500).json({ error: "OCR failed" });
        }   

        try {
            const result = JSON.parse(stdout.trim()); // parse OCR script output
            res.json({ plate: result.plate }); // send only number plate
        } catch (e) {
            res.status(500).json({ error: "Invalid OCR output" });
        }

    });
});


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
