const mongoose = require("mongoose");
const spSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    digit: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const SocialModel = new mongoose.model("Social", spSchema);
module.exports = SocialModel;