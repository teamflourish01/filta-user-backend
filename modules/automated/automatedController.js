const AutoModel = require("./automatedSchema");

exports.addMessage = async (req, res) => {
  let { text } = req.body;
  try {
    let userId = req.userID;
    let data = await AutoModel.findOneAndUpdate(
      userId,
      { userId, text },
      { new: true, upsert: true }
    );
    res.status(200).send({
        msg:"Message Added successfully",
        data
    })
  } catch (error) {
    console.log(error);
    
  }
};


exports.getMessage=async(req,res)=>{
    try {
        let userId=req.userID
        let data=await AutoModel.findOne({userId})
        res.status(200).send({
            msg:"Message retrived successfully",
            data
        })
    } catch (error) {
        console.log(error);
        
    }
}
