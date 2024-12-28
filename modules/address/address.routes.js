const express=require("express")
const addressRouter=express.Router()
const addressController=require("./addressController")
const authMiddleware = require("../../middleware/auth")

addressRouter.get("/",authMiddleware,addressController.getAddress)
addressRouter.post("/add",authMiddleware,addressController.addAddress)


module.exports=addressRouter

