const User = require("../user/userSchema");
const Shuffle = require("./shuffleSchema")

exports.addShuffle=async(req,res)=>{
    try {
        let userId=req.userID
        
        
        let data=await Shuffle.findOneAndUpdate({userId},{userId,...req.body},{new:true,upsert:true})
        console.log(data);
        
        let updatedUer=await User.findByIdAndUpdate(userId,{shuffle:data._id},{new:true})
        
        res.status(200).send({
            message:"Data added successfully",
            data
        })
    } catch (error) {
        res.status(400).send({
            message:"Failed to add shuffle",
            error
        })
    }
}