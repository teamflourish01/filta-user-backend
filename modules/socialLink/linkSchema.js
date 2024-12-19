const mongoose = require("mongoose");

const socialLinkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    platform: {
      type: String,
      required: true,
      enum: [
        "Instagram",
        "Facebook",
        "LinkedIn",
        "X (Twitter)",
        "Snapchat",
        "Threads",
        "Pinterest",
        "Telegram",
        "Youtube",
        "Text",
        "Call",
        "Email",
        "Contact",
        "WhatsApp",
        "Address",
        "Google Pay",
        "Phone Pay",
        "Paytm",
        "Google Drive",
        "Review",
      ],
    },
    text: { type: String, default: "" },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

const SocialLink = mongoose.model("SocialLink", socialLinkSchema);

module.exports = SocialLink;
