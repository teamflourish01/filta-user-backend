const User = require("../user/userSchema");
const SocialLink = require("./linkSchema");

exports.addLink = async (req, res) => {
  const { platform, text, url } = req.body;
  const userId = req.userID;
  try {
    if (!platform || !url) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const newLink = new SocialLink({ userId, platform, text, url });

    await newLink.save();

    await User.findByIdAndUpdate(userId, {
      $push: { socialLinks: newLink._id },
    });

    res
      .status(201)
      .json({ message: "Social link added successfully!", data: newLink });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.editLink = async (req, res) => {
  const { linkId } = req.params;
  const { text, url } = req.body;
  const userId = req.userID;
  try {
    // Validate required fields
    if (!linkId || !text || !url) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Find and update the social link
    const updatedLink = await SocialLink.findOneAndUpdate(
      { _id: linkId, userId },
      { text, url },
      { new: true }
    );

    if (!updatedLink) {
      return res
        .status(404)
        .json({ message: "Social link not found or unauthorized." });
    }

    res.status(200).json({
      message: "Social link updated successfully!",
      data: updatedLink,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
exports.getLink = async (req, res) => {
  try {
    const userID = req.userID;

    const data = await SocialLink.find({ userId: userID });
    res.status(200).json({
      message: "social Link fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteLink = async (req, res) => {
  const { linkId } = req.params;
  const userId = req.userID;

  try {
    const linkToDelete = await SocialLink.findOne({ _id: linkId, userId });

    if (!linkToDelete) {
      return res.status(404).json({ message: "Social link not found." });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { socialLinks: linkId },
    });

    await SocialLink.deleteOne({ _id: linkId });

    res.status(200).json({ message: "Social link deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
