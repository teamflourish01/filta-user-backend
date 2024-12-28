const express = require("express");
const authMiddleware = require("../../middleware/auth");
const docController = require("./docController");
const multer = require("multer");
const docRouter = express.Router();

//multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/documents");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create multer instance
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

docRouter
  .post(
    "/adddoc",
    upload.single("document"),
    authMiddleware,
    docController.addDoc
  )
  .delete("/deletedoc/:linkId", authMiddleware, docController.deleteDoc);

module.exports = docRouter;
