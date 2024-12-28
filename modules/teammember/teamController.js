const TeamModel = require("./teamSchema");

exports.addTeam = async (req, res) => {
  try {
    let userId = req.userID;
    let data = await TeamModel.findOneAndUpdate(
      { userId },
      { ...req.body, userId },
      { new: true, upsert: true }
    );
    res.status(200).send({
        msg:"Team Member Details Successfully added ",
        data
    })
  } catch (error) {
    console.log(error);
  }
};

exports.getTeam=async(req,res)=>{
    try {
        let userId=req.userID
        let data=await TeamModel.find({ userId: userId})
        res.status(200).send({
            msg:"Team Member Details Retrived Successfully",
            data
        })
    } catch (error) {
        console.log(error);
        
    }
}

exports.deleteTeam=async(req,res)=>{
    let {id}=req.params
    try {
        let userId=req.userID
        let data=await TeamModel.findByIdAndDelete(id)
        res.status(200).send({
            msg:"Team Member Details Retrived Successfully",
            data
        })
    } catch (error) {
        console.log(error);
        
    }
}