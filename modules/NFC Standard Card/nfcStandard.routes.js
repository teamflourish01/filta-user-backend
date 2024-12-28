const express=require("express")
const nfcStandardRouter=express.Router()
const nfcStandardController=require("./nfcStandardController")
const authMiddleware = require("../../middleware/auth")

nfcStandardRouter.post("/add",authMiddleware,nfcStandardController.addStandardDetails)






module.exports=nfcStandardRouter