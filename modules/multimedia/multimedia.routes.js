const express = require("express");
const multiMediaRouter = express.Router();
const multimediaController = require("./multimediaController");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../../middleware/auth");

//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/multimedia");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

multiMediaRouter.post(
  "/add",
  upload.fields([{ name: "video_file" }]),
  authMiddleware,
  multimediaController.addMedia
);

// multiMediaRouter.get("/", authMiddleware, multimediaController.getMedia);
// multiMediaRouter.post(
//   "/add",
//   upload.fields([{ name: "multimedia" }]),
//   authMiddleware,
//   multimediaController.addMedia
// );
// multiMediaRouter.post(
//   "/edit",
//   upload.fields([{ name: "multimedia" }]),
//   authMiddleware,
//   multimediaController.editMedia
// );
// multiMediaRouter.delete(
//   "/delete/:id",
//   authMiddleware,
//   multimediaController.deleteMedia
// );

module.exports = multiMediaRouter;
