const mongoose = require("mongoose");
const ctaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    btn_type: {
      type: String,
      require: true,
    },
    btn_text: {
      type: String,
    },
    mobile: { type: String },
    url: { type: String },
    mail: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const ctaModel = new mongoose.model("CtaButton", ctaSchema);

module.exports = ctaModel;
