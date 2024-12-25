const User = require("../user/userSchema");
const About = require("./aboutSchema");

exports.addabout = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userID;
  try {
    const data = await About.findOneAndUpdate(
      { userId },
      { $set: { title, description } },
      { new: true, upsert: true }
    );

    await User.findByIdAndUpdate(userId, { about: data._id });

    res.status(201).json({
      message: data
        ? "About updated successfully"
        : "About created successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
