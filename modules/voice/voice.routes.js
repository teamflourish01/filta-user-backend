const express = require("express");
const authMiddleware = require("../../middleware/auth");
const voiceController = require("./voiceController");
const multer = require("multer");
const path = require("path");
const voiceRouter = express.Router();

//multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/voices');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for voice files
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only MP3, WAV, and MPEG are allowed.'));
  }
};

// Create multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

voiceRouter  
  .post("/addvoice",upload.single("voice"), authMiddleware, voiceController.addVoice)
  .delete("/deletevoice/:linkId", authMiddleware, voiceController.deleteVoice);

module.exports = voiceRouter;
