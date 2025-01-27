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

multimediaSchema.pre("save", function (next) {
  if (this.youtube_url && Array.isArray(this.youtube_url)) {
    this.youtube_url = this.youtube_url.map((url) => {
      const parts = url.split("=");
      return parts[1] || url;
    });
  }
  next();
});

const MultiMedia = new mongoose.model("MultiMedia", multimediaSchema);

module.exports = MultiMedia;
