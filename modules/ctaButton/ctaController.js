const ctaModel = require("./ctaSchema");

exports.addCta=async(req,res)=>{
    try {
        let userId=req.userID
        let data=await ctaModel.findOneAndUpdate({userId},{...req.body,userId},{new:true,upsert:true})
        res.status(200).send({
            msg:"Data updated successfully",
            data
        })
    } catch (error) {
        console.log(error);
        
    }
}

exports.getCta=async(req,res)=>{
    try {
        let userId=req.userID
        let data=await ctaModel.findOne({userId})
        res.send({
            msg:"Data retrived successfully",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

exports.deleteCta=async(req,res)=>{
    try {
        let userId=req.userID
        let data=await ctaModel.findOneAndDelete({userId})
        res.status(200).send({
            msg:"Data deleted successfully",
            data
        })
    } catch (error) {
        console.log(error);
        
    }
}