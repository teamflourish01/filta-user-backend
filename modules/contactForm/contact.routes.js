const express = require("express");
const contactFormRouter = express.Router();

const contactformController = require("./contactController");
const authMiddleware = require("../../middleware/auth");

contactFormRouter
  .post("/add", authMiddleware, contactformController.addEmailMessage)
  .get("/gatemailmsg", authMiddleware, contactformController.getEmailMessage)
  .post("/send-email", authMiddleware, contactformController.createContactmail)
  .get("/email", contactformController.getEmail)
  .delete("/email/delete/:id", contactformController.deleteEmail);

module.exports = contactFormRouter;
