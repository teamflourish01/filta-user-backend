const TsOfferModel = require("./timesensitiveSchema");

exports.addoffer = async (req, res) => {
  try {
    let userId = req.userID;
    let files = req.files.image.map((e) => e?.filename);

    let existData = await TsOfferModel.findOne({ userId: userId });
    let updatedFields
    if(existData && files.length>0){
      updatedFields={
        userId,
        imaage: [...files,...existData.image],
      }
    }else if(files.length>0){
      updatedFields={
        userId,
        image:[...files]
      }
    }
    else {
      updatedFields={
        userId,
        image:[...req.body.image]
      }
    }

    let data = await TsOfferModel.findOneAndUpdate(
      userId,
      updatedFields,
      {
        new: true,
        upsert: true,
      }
    );
    res.status(200).send({
        msg:"Successfully updated image",
        data
    })
  } catch (error) {
    console.log(error);
  }
};


exports.getOffer=async(req,res)=>{
    try {
    let userId = req.userID;
        let data=await TsOfferModel.findOne({userId})

        res.status(200).send({
            msg:"Successfully Retrived offer",
            data
        })
    } catch (error) {
        console.log(error);
        
    }
}


// exports.deleteOffer=async(req,res)=>{
//   try {
//     let userId=req.userID

//     let existData=await TsOfferModel.findOne({userId})
//     let images=existData.image

//   } catch (error) {
    
//   }
// }
