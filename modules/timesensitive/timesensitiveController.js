const User = require("../user/userSchema");
const TsOfferModel = require("./timesensitiveSchema");

exports.addOffer = async (req, res) => {
  try {
    let userId = req.userID;
    const user = await User.findById(userId);
    if (!user || !user.premium) {
      return res.status(403).json({
        msg: "Please upgrade to the Premium plan to access this feature.",
      });
    }
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

