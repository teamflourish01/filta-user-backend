const express = require("express");
const authMiddleware = require("../../middleware/auth");
const aboutController = require("./aboutController");

const aboutRouter = express.Router();

aboutRouter.post("/addabout", authMiddleware, aboutController.addabout);

module.exports = aboutRouter;
