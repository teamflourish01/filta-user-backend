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

// exports.editUser = async (req, res) => {
//   const { email, password } = req.body;
//   const userId = req.userID;

//   if (!email && !password) {
//     return res
//       .status(400)
//       .json({ message: "Please provide email or password to update" });
//   }

//   try {
//     const updates = {};

//     if (email) {
//       const emailExists = await User.findOne({ email });
//       if (emailExists && emailExists._id.toString() !== userId) {
//         return res
//           .status(400)
//           .json({ message: "Email already in use by another user" });
//       }
//       updates.email = email;
//     }

//     if (password) {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       updates.password = hashedPassword;
//     }

//     const updatedUser = await User.findByIdAndUpdate(userId, updates, {
//       new: true,
//     });

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const token = jwt.sign(
//       { userId: updatedUser._id, email: updatedUser.email },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({
//       message: "User updated successfully",
//       data: updatedUser,
//       token,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error updating user" });
//   }
// };
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
