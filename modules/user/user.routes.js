const express = require("express");
const authMiddleware = require("../../middleware/auth");
const userController = require("./userController");
const { expiryMiddleware } = require("../../middleware/expiryCounter");

const userRouter = express.Router();

userRouter
  .post("/signup", userController.addUser)
  .post("/signin", userController.loginUser)
  .get("/loginuser", authMiddleware,expiryMiddleware ,userController.getloginUser)
  .patch("/edituser", authMiddleware, userController.editUser);

module.exports = userRouter;
