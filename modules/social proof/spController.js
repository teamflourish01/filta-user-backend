const SocialModel = require("./spSchema")

exports.addProof=async(req,res)=>{
    try {
        let userId=req.userID
        let data=await SocialModel.findOneAndUpdate(userId,{userId,...req.body},{new:true,upsert:true})

        res.status(200).send({
            msg:"Data Updated Succesfully",
            data
        })
    } catch (error) {
        console.log(error);
        
    }
}

exports.getProof=async(req,res)=>{
    try {
        let userId=req.userID
        let data=await SocialModel.find({userId})
        res.status(200).send({msg:"Data Updated Succesfully",data})
    } catch (error) {
        console.log(error);
    }
}

exports.deleteProof=async(req,res)=>{
    try {
        let {id}=req.params
        let userId=req.userID
        let data=await SocialModel.findAndDelete({userId,_id:id})
        res.status(200).send({
            msg:"Data Deleted Succesfully",
            data
        })
    } catch (error) {
        console.log(error);
        
    }
}