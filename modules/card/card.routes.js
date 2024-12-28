const express = require("express");
const multer = require("multer");
const path = require("path");
const cardController = require("./cardController");
const authMiddleware = require("../../middleware/auth");

const cardRouter = express.Router();

//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

const uploadFields = upload.fields([
  { name: "profileimg", maxCount: 1 },
  { name: "coverimg", maxCount: 1 },
  { name: "logoimg", maxCount: 1 },
  {name:"multimedia"}
]);

cardRouter
  .post("/addcard", uploadFields, authMiddleware, cardController.addCard)
  .patch("/editcard", uploadFields, authMiddleware, cardController.editCard)
  .get("/", authMiddleware, cardController.getUsercard);

module.exports = cardRouter;
