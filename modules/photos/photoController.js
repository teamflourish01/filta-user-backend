const User = require("../user/userSchema");
const { exists } = require("../user/userSchema");
const PhotoModel = require("./photoSchema");

exports.addPhoto = async (req, res) => {
  try {
    let userId = req.userID;
    let files = req.files.image?.map((e) => e?.filename);
    if (!files || !files.length) {
      return res.status(400).send({ msg: "No files uploaded" });
    }
    
    let photoData = await PhotoModel.findOneAndUpdate(
      { userId },
      { $addToSet: { image: { $each: files } } },
      { new: true, upsert: true }
    );
    // Update User's photos array
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { photos: photoData._id } },
      { new: true }
    );
    res.status(200).send({
      msg: "Photo updated successfully",
      data: photoData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server Error", error: error.message });
  }
};

exports.getPhoto = async (req, res) => {
  try {
    let userId = req.userID;
    let data = await PhotoModel.findOne({ userId });
    res.status(200).send({
      msg: "Data retrived Successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const { photoId, imageUrl } = req.query;
    if (!photoId || !imageUrl) {
      return res.status(400).send({ msg: "Invalid parameters" });
    }

    // Find and update the photo document
    const updatedPhotoData = await PhotoModel.findOneAndUpdate(
      { _id: photoId },
      { $pull: { image: imageUrl } },
      { new: true }
    );

    if (!updatedPhotoData) {
      return res.status(404).send({ msg: "Photo not found" });
    }

    res
      .status(200)
      .send({ msg: "Photo deleted successfully", data: updatedPhotoData });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server Error", error: error.message });
  }
};
