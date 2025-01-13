const mongoose = require("mongoose");
const autoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const AutoModel = new mongoose.model("Automated", autoSchema);

module.exports = AutoModel;
