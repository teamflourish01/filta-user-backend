const mongoose = require("mongoose");
const premiumSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    cardLayout: { type: String, default: "layout 1" },
    logo: { type: String },
    logoMaxWidth: { type: String },
    logoMaxHeight: { type: String },
    name: { type: String },
    additional: { type: String },
    email: { type: String },
    mobile: { type: String },
    card_url: { type: String },
    cardBackgroundColor: { type: String, default: "#000000" },
    accentColor: { type: String, default: "#ffffff" },
    cardTheme: { type: String },
    font: { type: [String], default: ["popins"] },
    primaryTextColor: { type: String, default: "#ffffff" },
    secondaryTextColor: { type: String, default: "#ffffff" },
    qrCodeColor: { type: String, default: "#000000" },
    hideNfc: { type: Boolean, default: false },
    hideFilta: { type: Boolean, default: false },
    hideEmail: { type: Boolean, default: false },
    hideNumber: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const NfcPremium = new mongoose.model("NfcPremium", premiumSchema);
module.exports = NfcPremium;
