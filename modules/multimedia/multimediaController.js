const User = require("../user/userSchema");
const MultiMedia = require("./multimediaSchema");

exports.addMedia = async (req, res) => {
  try {
    let userId = req.userID;
    let files = Array.isArray(req.files.video_file)
      ? req.files.video_file.map((e) => e?.filename)
      : [];
    let youtubeUrls = req.body.youtube_url
      ? JSON.parse(req.body.youtube_url).filter((url) => url.trim() !== "")
      : [];
    let deletedUrls = req.body.deleted_urls
      ? JSON.parse(req.body.deleted_urls)
      : [];
    let deletedVideos = req.body.deleted_videos
      ? JSON.parse(req.body.deleted_videos)
      : [];
    if (files.length === 0 && youtubeUrls.length === 0) {
      return res.status(400).send({ msg: "No media files or URLs provided" });
    }
    let multimedia = await MultiMedia.findOne({ userId });

    if (!multimedia) {
      // Create new entry if not found
      multimedia = new MultiMedia({
        userId,
        video_file: files,
        youtube_url: youtubeUrls,
      });
    } else {
      // Update existing URLs
      youtubeUrls.forEach((url, index) => {
        if (multimedia.youtube_url[index]) {
          multimedia.youtube_url[index] = url;
        } else {
          multimedia.youtube_url.push(url);
        }
      });
      multimedia.youtube_url = multimedia.youtube_url.filter(
        (url) => !deletedUrls.includes(url)
      );
      multimedia.video_file = multimedia.video_file.filter(
        (video) => !deletedVideos.includes(video)
      );
      multimedia.video_file.push(...files);
    }

    const savedMultimedia = await multimedia.save();

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { multimedia: savedMultimedia._id } },
      { new: true }
    );
    res.status(200).send({
      msg: "Multi medaia Add Successfuly",
      data: savedMultimedia,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server Error", error: error.message });
  }
};

// exports.editMedia = async (req, res) => {
//   try {
//     const userId = req.userID;

//     let existingData = await MultiMedia.findOne({ userId });
//     if (!existingData) {
//       return res.send({
//         msg: "No such user Data Exist",
//         data: existingData,
//       });
//     }
//     let newVideoFiles = req?.files?.multimedia.map((e) => e?.filename);

//     let videoFiles = [...existingData.video_file, ...newVideoFiles];

//     let updatedFields = {
//       ...req.body,
//       video_file: videoFiles,
//     };

//     let updatedData = await MultiMedia.findOneAndUpdate(
//       { _id: existingData._id },
//       updatedFields,
//       { new: true }
//     );
//     res.status(200).send({
//       msg: "Date updated Successfully",
//       data: updatedData,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.deleteMedia = async (req, res) => {
//   try {
//     let userId = req.userID;
//     let { id } = req.params;
//     // let existingData = await MultiMedia.findOne({ userId });
//     // if (!existingData) {
//     //   res.status(200).send({
//     //     msg: "Media not found",
//     //     data: existingData,
//     //   });
//     // }

//     let deletedData = await MultiMedia.findByIdAndDelete(id);
//     // await User.updateOne(
//     //   { _id: userId },
//     //   { $pull: { multimedia: mongoose.Types.ObjectId(id) } } // Assuming 'media' is the field storing media IDs
//     // );
//     res.status(200).send({
//       msg: "Data deleted Successfully",
//       data: deletedData,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.getMedia = async (req, res) => {
//   try {
//     let userId = req.userID;
//     let data = await MultiMedia.find({ userId });
//     res.status(200).send({
//       msg: "Data retrieved Successfully",
//       data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
