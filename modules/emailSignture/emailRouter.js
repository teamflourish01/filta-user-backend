const express = require("express");
const multer = require("multer");
const path = require("path");
const { addemail } = require("./emailController");

const emailRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const uploadSignature = upload.single("signature");

emailRouter.post("/addemail", uploadSignature, addemail);

module.exports = emailRouter;
