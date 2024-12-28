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
    documents: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
    ],

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
