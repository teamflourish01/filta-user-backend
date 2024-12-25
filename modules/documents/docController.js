const User = require("../user/userSchema");
const Document = require("./docSchema");

exports.addDoc = async (req, res) => {
  const userId = req.userID;
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No Doc file uploaded." });
    }

    const doc = new Document({
      document: req.file.filename,
      ...req.body,
      userId,
    });

    const savedDoc = await doc.save();

    // Update the user with the new voice message ID
    await User.findByIdAndUpdate(userId, {
      $push: { documents: savedDoc._id },
    });

    res.status(201).json({
      message: "Document file uploaded successfully.",
      data: savedDoc,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.deleteDoc = async (req, res) => {
  const { linkId } = req.params;
  const userId = req.userID;

  try {
    const linkToDelete = await Document.findOne({ _id: linkId, userId });

    if (!linkToDelete) {
      return res.status(404).json({ message: "Documents not found." });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { documents: linkId },
    });

    await Document.deleteOne({ _id: linkId });

    res.status(200).json({ message: "Voice Message deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
