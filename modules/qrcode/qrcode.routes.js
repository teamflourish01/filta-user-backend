const express = require("express");
const multer = require("multer");
const qrController = require("./qrcodeController");
const authMiddleware = require("../../middleware/auth");

const qrcodeRouter = express.Router();

//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/qrcodelogo");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

qrcodeRouter
  .post(
    "/add",
    upload.fields([{ name: "qrimage" }, { name: "qrpng" }]),
    authMiddleware,
    qrController.addQrcode
  )
  .post(
    "/addauto",
    upload.fields([{ name: "qrpng" }]),
    authMiddleware,
    qrController.addAutoQrcode
  );

module.exports = qrcodeRouter;
