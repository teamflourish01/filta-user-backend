const User = require("../user/userSchema");
const VoiceMessage = require("./voiceSchema");
const SocialLink = require("./voiceSchema");

exports.addVoice = async (req, res) => {
  const userId = req.userID;
  try {
    const user = await User.findById(userId);
    if (!user || !user.premium) {
      return res.status(403).json({
        message: "Please upgrade to the Premium plan to access this feature.",
      });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No voice file uploaded." });
    }

    const voice = new VoiceMessage({
      voice: req.file.filename,
      userId,
    });

    const savedVoice = await voice.save();

    // Update the user with the new voice message ID
    await User.findByIdAndUpdate(userId, {
      $push: { voiceMessage: savedVoice._id },
    });

    res.status(201).json({
      message: "Voice file uploaded successfully.",
      data: savedVoice,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.deleteVoice = async (req, res) => {
  const { linkId } = req.params;
  const userId = req.userID;

  try {
    const linkToDelete = await VoiceMessage.findOne({ _id: linkId, userId });

    if (!linkToDelete) {
      return res.status(404).json({ message: "Voice Message not found." });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { voiceMessage: linkId },
    });

    await VoiceMessage.deleteOne({ _id: linkId });

    res.status(200).json({ message: "Voice Message deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
