const mongoose = require("mongoose");
const multimediaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    video_file: { type: Array, default: [] },
    youtube_url: { type: Array, default: [] },
  },
  { versionKey: false, timestamps: true }
);

const MultiMedia = new mongoose.model("MultiMedia", multimediaSchema);

module.exports = MultiMedia;
