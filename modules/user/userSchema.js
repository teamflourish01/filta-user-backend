const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    card: { type: mongoose.Schema.Types.ObjectId, ref: "Card" },
    planExpired: { type: String },
    notifications: { type: Array },
    socialLinks: [{ type: mongoose.Schema.Types.ObjectId, ref: "SocialLink" }],

    multimedia: [{ type: mongoose.Schema.Types.ObjectId, ref: "MultiMedia" }],

    voiceMessage: [
      { type: mongoose.Schema.Types.ObjectId, ref: "VoiceMessage" },
    ],
    about: { type: mongoose.Schema.Types.ObjectId, ref: "About" },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
    myLeads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contactform" }],
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Photo",
      },
    ],
    multimedia: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MultiMedia",
      },
    ],
    timeoffer: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TsOffer",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
