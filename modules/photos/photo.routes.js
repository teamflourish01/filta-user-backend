const express=require("express")
const photoRouter=express.Router()
const multer=require("multer")
const photoController=require("./photoController")
const authMiddleware = require("../../middleware/auth")

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/photo")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({
    storage:storage
})

photoRouter.post("/add",upload.fields([{name:"photo"}]),authMiddleware,photoController.addPhoto)
photoRouter.get("/",authMiddleware,photoController.getPhoto)



module.exports=photoRouter