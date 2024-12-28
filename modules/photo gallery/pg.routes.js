const express=require("express")
const pgRouter=express.Router()
const pgController=require("./pgController")
const multer=require("multer")
const authMiddleware = require("../../middleware/auth")

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/photoGallery")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({
    storage:storage
})


pgRouter.get("/",upload.single("gallery"),authMiddleware,pgController.addGallery)
pgRouter.delete("/delete/:id",authMiddleware,pgController.deleteGallery)










module.exports=pgRouter