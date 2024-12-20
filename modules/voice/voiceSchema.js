const mongoose = require("mongoose");

const voiceMessageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    voice: { type: String },
  },
  { timestamps: true }
);

const VoiceMessage = mongoose.model("VoiceMessage", voiceMessageSchema);

module.exports = VoiceMessage;
