const User = require("../user/userSchema");
const NfcPremium = require("./premiumSchema");
const path = require("path");

exports.addPremium = async (req, res) => {
  try {
    let userId = req.userID;

    // let data = await new NfcPremium({
    //   ...req.body,
    //   userId,
    //   logo: req.files?.logo[0]?.filename,
    //   cardTheme: req.files?.theme[0]?.filename,
    // });

    let currentData=await NfcPremium.findOne({userId})
    // console.log(req.files.logo[0]?.filename, "req.files?.logo?.filename");
    

    let updatedData={
        ...req.body,
        userId,
        logo:(req.files?.logo && req.files?.logo[0]?.filename) || currentData?.logo  ||"" ,
        // cardTheme: (req.files?.theme&& req.files?.theme[0]?.filename) || currentData?.theme || "",
    }

    let data=await NfcPremium.findOneAndUpdate({userId},updatedData,{new:true,upsert:true})

    let userData= await User.findByIdAndUpdate(userId,{
        nfcPremium:data._id
  },{new:true})

    res.status(200).send({
    msg: "Successfully added",
    data
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteLogoPremium=async(req,res)=>{
  let userId=req.userID;

  try {
    let deletedData=await NfcPremium.findOneAndUpdate({userId},{...req.body},{new:true})
    res.status(200).send({
      data:deletedData,
      msg:"Data Deleted SuccessFull "
    })
  } catch (error) {
    res.status(400).send({
      msg:error.message,
      error
    })
  }
}

