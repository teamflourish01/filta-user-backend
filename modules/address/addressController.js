const AddressModel = require("./addressSchema");

exports.addAddress = async (req, res) => {
  try {
    let userId = req.userID;
    let data = await AddressModel.findOneAndUpdate(
      { userId },
      { ...req.body, userId },
      { new: true, upsert: true }
    );
    res.status(200).send({
      msg: "Data updated successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
        msg:"Error updating address",
        error
    })
  }
};

exports.getAddress=async(req,res)=>{
    try {
    let userId = req.userID;
        let data=await AddressModel.findOne({userId})
        res.status(200).send({msg:"Data Retrived successfully",
            data
        })

    } catch (error) {
        res.status(400).send({
            msg:"Error retriving address",
            error
        })
    }
}
