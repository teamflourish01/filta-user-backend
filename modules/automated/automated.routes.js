const express=require("express")
const authMiddleware = require("../../middleware/auth")
const autoRouter=express.Router()
const autoController=require("./automatedController")

autoRouter.post("/add",authMiddleware,autoController.addMessage)
autoRouter.get("/",authMiddleware,autoController.getMessage)






module.exports=autoRouter