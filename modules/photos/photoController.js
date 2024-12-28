const { exists } = require("../user/userSchema");
const PhotoModel = require("./photoSchema")

exports.addPhoto=async(req,res)=>{
    try {
        let userId=req.userID;
        let files=req.files.photo.map((e)=>e?.filename)
        let existData=await PhotoModel.findOne({userId})
        let updatedFields
        if(existData && files.length>0){
            updatedFields={
                userId,
                image:[...files,existData.image]
            }
        }else if(files.length>0){
            updatedFields={
                userId,
                image:[...files]
            }
        }else{
            updatedFields={
                userId,
                image:[...existData.image]
            }
        }

        let data=await PhotoModel.findOneAndUpdate(userId,updatedFields,{new:true,upsert:true})

        res.status(200).send({
            msg:"Photo updated successfully",
            data
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getPhoto=async(req,res)=>{
    try {
        let userId=req.userID
        let data=await PhotoModel.findOne({userId})
        res.status(200).send({
            msg:"Data retrived Successfully",
            data
        })
    } catch (error) {
        console.log(error);
    }
}