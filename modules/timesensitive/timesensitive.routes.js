const express=require("express");
const multer=require("multer");
const tsOffferRouter=express.Router()
const path=require("path");
const authMiddleware = require("../../middleware/auth");
const tsOfferController=require("./timesensitiveController")

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/")
    },
    filename:function (req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
  storage: storage,
});


tsOffferRouter.post("/add",upload.fields([{name:"image"}]),authMiddleware,tsOfferController.addoffer)
tsOffferRouter.get("/",authMiddleware,tsOfferController.getOffer)





module.exports={tsOffferRouter}