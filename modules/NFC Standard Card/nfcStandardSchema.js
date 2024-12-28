const mongoose = require("mongoose");
const standardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
    },
    additional: {
      type: String,
    },
    email: {
      type: String,
    },
    show_email: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
    show_phone: {
      type: Boolean,
      default: true,
    },
    card_url: {
      type: String,
    },
    card_color: {
      type: String,
    },
    accent_color: {
      type: String,
    },
    hide_nfc: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const NfcStandardModel = new mongoose.model("NfcStandard", standardSchema);
module.exports = NfcStandardModel;
