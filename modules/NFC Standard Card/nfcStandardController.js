const NfcStandardModel = require("./nfcStandardSchema")

exports.addStandardDetails=async(req,res)=>{
    try {
        let userId=req.userID
        let data=await NfcStandardModel.findOneAndUpdate({userId},req.body,{new:true,upsert:true})
        response.status(200).send({
            msg:"Data updated successfully",
            data
        })
    } catch (error) {
        response.status(400).send({
            msg:"Error updating standard",
            error
        })
    }
}