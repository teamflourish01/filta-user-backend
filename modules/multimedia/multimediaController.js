const User = require("../user/userSchema");
const MultiMedia = require("./multimediaSchema");

exports.addMedia = async (req, res) => {
  try {
    console.log(req.files);
    let videoFile=req?.files?.multimedia[0].filename
    // let videoFiles = req?.files?.multimedia?.map((e) => e?.filename);
    // console.log(req.files.multimedia[0]?.filename);
    console.log(videoFile,"videoFile");
    
    let data = await MultiMedia({
      userId: req.userID,
      video_file: videoFile,
      ...req.body,
    });
    await data.save();
    await User.findByIdAndUpdate(req.userID, {
      $push: { multimedia: data._id },
    });
    res.status(200).send({
      msg: "Success message",
      data,
    });
  } catch (error) {
    res.status(400).send({
      msg: "Error message",
      error,
    });
  }
};

exports.editMedia = async (req, res) => {
  try {
    const userId = req.userID;

    let existingData = await MultiMedia.findOne({ userId });
    if (!existingData) {
      return res.send({
        msg: "No such user Data Exist",
        data: existingData,
      });
    }
    let newVideoFiles = req?.files?.multimedia.map((e) => e?.filename);

    let videoFiles = [...existingData.video_file, ...newVideoFiles];

    let updatedFields = {
      ...req.body,
      video_file: videoFiles,
    };

    let updatedData = await MultiMedia.findOneAndUpdate(
      { _id: existingData._id },
      updatedFields,
      { new: true }
    );
    res.status(200).send({
      msg: "Date updated Successfully",
      data: updatedData,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    let userId = req.userID;
    let {id}=req.params
    // let existingData = await MultiMedia.findOne({ userId });
    // if (!existingData) {
    //   res.status(200).send({
    //     msg: "Media not found",
    //     data: existingData,
    //   });
    // }

    let deletedData = await MultiMedia.findByIdAndDelete(id);
    // await User.updateOne(
    //   { _id: userId },
    //   { $pull: { multimedia: mongoose.Types.ObjectId(id) } } // Assuming 'media' is the field storing media IDs
    // );
    res.status(200).send({
      msg: "Data deleted Successfully",
      data: deletedData,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getMedia = async (req, res) => {
  try {
    let userId = req.userID;
    let data = await MultiMedia.find({ userId });
    res.status(200).send({
      msg: "Data retrieved Successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
