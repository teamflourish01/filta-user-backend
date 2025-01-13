const mongoose = require("mongoose");
const qrSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    qrcolor: { type: String, default: "#000000" },
    qrimage: { type: String, default: "" },
    qrpng: { type: String, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Qrmodel = new mongoose.model("Qrcode", qrSchema);
module.exports = Qrmodel;
