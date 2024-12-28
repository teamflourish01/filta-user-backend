const express=require("express")
const teamRouter=express.Router()
const teamController=require("./teamController")
const authMiddleware = require("../../middleware/auth")

teamRouter.post("/add",authMiddleware,teamController.addTeam)
teamRouter.get("/",authMiddleware,teamController.getTeam)
teamRouter.delete("/delete",authMiddleware,teamController.deleteTeam)

module.exports=teamRouter
