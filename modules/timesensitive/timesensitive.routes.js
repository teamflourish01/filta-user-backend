const express = require("express");
const multer = require("multer");
const tsOffferRouter = express.Router();
const path = require("path");
const authMiddleware = require("../../middleware/auth");
const tsOfferController = require("./timesensitiveController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/timesoffer");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

tsOffferRouter
  .post(
    "/add",
    upload.fields([{ name: "image" }]),
    authMiddleware,
    tsOfferController.addOffer
  )
  .delete("/delete", tsOfferController.deletePhoto);

module.exports = { tsOffferRouter };
