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
    voiceMessage: [
      { type: mongoose.Schema.Types.ObjectId, ref: "VoiceMessage" },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
