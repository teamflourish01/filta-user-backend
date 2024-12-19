const express = require("express");
const authMiddleware = require("../../middleware/auth");
const linkController = require("./linkController");

const linkRouter = express.Router();

linkRouter
  .get("/link", authMiddleware, linkController.getLink)
  .post("/addlink", authMiddleware, linkController.addLink);

module.exports = linkRouter;