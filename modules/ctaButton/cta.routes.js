const express=require("express")
const ctaRouter=express.Router()
const ctaController=require("./ctaController")
const authMiddleware = require("../../middleware/auth")

ctaRouter.post("/add",authMiddleware,ctaController.addCta)
ctaRouter.get("/",authMiddleware,ctaController.getCta)
ctaRouter.delete("/delete",authMiddleware,ctaController.deleteCta)




module.exports=ctaRouter
