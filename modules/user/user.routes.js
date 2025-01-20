const express = require("express");
const authMiddleware = require("../../middleware/auth");
const userController = require("./userController");
const { expiryMiddleware } = require("../../middleware/expiryCounter");
const { planExpiry } = require("../../notifications/planExpiry");

const userRouter = express.Router();

userRouter
  .post("/signup", userController.addUser)

  .post("/signin",expiryMiddleware  ,userController.loginUser)



  .get("/userdetails", authMiddleware, userController.getUserDetails)


  
  .post("/googlesignup",userController.GoogleSignup)
  .post("/googlesignin",userController.googleLogin)
  .post("/forgot",userController.forgatPasswordMail)
  .get("/loginuser", authMiddleware,expiryMiddleware ,userController.getloginUser)

  
  .get("/:username",userController.getDataByuserName)

  .patch("/edituser", authMiddleware, userController.editUser);

module.exports = userRouter;
