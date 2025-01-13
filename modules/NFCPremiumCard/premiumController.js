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


    let updatedData={
        ...req.body,
        userId,
        logo: req.files?.logo?.filename || currentData?.logo  ||"" ,
        cardTheme: req.files?.theme?.filename || currentData?.theme || "",
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
