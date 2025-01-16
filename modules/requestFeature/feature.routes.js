const express = require("express");
const requestFeatureRouter = express.Router();
const fetureController = require("./fetatureController");
const authMiddleware = require("../../middleware/auth");

requestFeatureRouter.post(
  "/send-email",
  authMiddleware,
  fetureController.sendEmail
);

module.exports = requestFeatureRouter;
