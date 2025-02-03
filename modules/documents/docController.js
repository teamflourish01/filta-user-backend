const User = require("../user/userSchema");
const Document = require("./docSchema");

exports.addDoc = async (req, res) => {
  const userId = req.userID;
  try {
    const user = await User.findById(userId);
    if (!user || !user.premium) {
      return res.status(403).json({
        message: "Please upgrade to the Premium plan to access this feature.",
      });
    }
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

    res.status(200).json({ message: "Documents deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.editDoc = async (req, res) => {
  const { docId } = req.params;
  const userId = req.userID;

  try {
    const doc = await Document.findById(docId);

    if (!doc) {
      return res.status(404).json({ message: "Document not found." });
    }

    if (doc.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to edit this document." });
    }

    if (req.file) {
      doc.document = req.file.filename;
    }

    doc.set(req.body);

    const updatedDoc = await doc.save();

    res.status(200).json({
      message: "Document updated successfully.",
      data: updatedDoc,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
