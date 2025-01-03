const express = require("express");
const pgRouter = express.Router();
const pgController = require("./pgController");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/photogallery");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

pgRouter
  .post("/add", upload.single("image"), authMiddleware, pgController.addGallery)
  .patch(
    "/edit/:id",
    upload.single("image"),
    authMiddleware,
    pgController.editGallery
  )
  .delete("/delete/:galleryId", authMiddleware, pgController.deleteGallery);

module.exports = pgRouter;
