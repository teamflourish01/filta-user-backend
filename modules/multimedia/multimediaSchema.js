const mongoose = require("mongoose");
const multimediaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    video_file: { type: String },
    youtube_url: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const MultiMedia = mongoose.model("MultiMedia", multimediaSchema);

module.exports = MultiMedia;
