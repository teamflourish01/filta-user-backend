const express = require("express");
const feedbackRouter = express.Router();
const feedbackController = require("./feedbackController");
const authMiddleware = require("../../middleware/auth");

feedbackRouter.post(
  "/send-email",
  authMiddleware,
  feedbackController.sendEmail
);

module.exports = feedbackRouter;
