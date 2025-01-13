const User = require("../user/userSchema")
const NfcStandardModel = require("./nfcStandardSchema");

exports.addStandardDetails=async(req,res)=>{
    try {
        let userId=req.userID
        let data=await NfcStandardModel.findOneAndUpdate({userId},req.body,{new:true,upsert:true})
        await User.findOneAndUpdate({_id:userId},{$addToSet:{nfcStandard:data?._id}},{new:true})
        res.status(200).send({
            msg:"Data updated successfully",
            data
        })
    } catch (error) {
        res.status(400).send({
            msg:"Error updating standard",
            error
        })
    }
}


