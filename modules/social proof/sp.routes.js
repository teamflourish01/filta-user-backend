const express=require("express")
const spRouter=express.Router()
const spController=require("./spController")
const authMiddleware = require("../../middleware/auth")

spRouter.post("/add",authMiddleware,spController.addProof)
spRouter.get("/",authMiddleware,spController.getProof)
spRouter.delete("/:id",authMiddleware,spController.deleteProof)




module.exports=spRouter