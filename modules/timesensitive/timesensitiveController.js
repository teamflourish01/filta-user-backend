const User = require("../user/userSchema");
const TsOfferModel = require("./timesensitiveSchema");

exports.addOffer = async (req, res) => {
  try {
    let userId = req.userID;
    let files = req.files.image?.map((e) => e?.filename);
    if (!files || !files.length) {
      return res.status(400).send({ msg: "No Time Offer uploaded" });
    }
    
    let photoData = await TsOfferModel.findOneAndUpdate(
      { userId },
      { $addToSet: { image: { $each: files } } },
      { new: true, upsert: true }
    );
    // Update User's photos array
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { timeoffer: photoData._id } },
      { new: true }
    );
    res.status(200).send({
      msg: "Times Offer updated successfully",
      data: photoData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server Error", error: error.message });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const { photoId, imageUrl } = req.query;
    if (!photoId || !imageUrl) {
      return res.status(400).send({ msg: "Invalid parameters" });
    }

    // Find and update the photo document
    const updatedPhotoData = await TsOfferModel.findOneAndUpdate(
      { _id: photoId },
      { $pull: { image: imageUrl } },
      { new: true }
    );

    if (!updatedPhotoData) {
      return res.status(404).send({ msg: "TimesOffer not found" });
    }

    res
      .status(200)
      .send({ msg: "Times offer Photo deleted successfully", data: updatedPhotoData });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server Error", error: error.message });
  }
};

// exports.addoffer = async (req, res) => {
//   try {
//     let userId = req.userID;
//     let files = req.files.image.map((e) => e?.filename);

//     let existData = await TsOfferModel.findOne({ userId: userId });
//     let updatedFields
//     if(existData && files.length>0){
//       updatedFields={
//         userId,
//         imaage: [...files,...existData.image],
//       }
//     }else if(files.length>0){
//       updatedFields={
//         userId,
//         image:[...files]
//       }
//     }
//     else {
//       updatedFields={
//         userId,
//         image:[...req.body.image]
//       }
//     }

//     let data = await TsOfferModel.findOneAndUpdate(
//       userId,
//       updatedFields,
//       {
//         new: true,
//         upsert: true,
//       }
//     );
//     res.status(200).send({
//         msg:"Successfully updated image",
//         data
//     })
//   } catch (error) {
//     console.log(error);
//   }
// };


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
