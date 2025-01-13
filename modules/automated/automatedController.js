const User = require("../user/userSchema");
const AutoModel = require("./automatedSchema");

exports.addMessage = async (req, res) => {
  let { text } = req.body;
  try {
    let userId = req.userID;
    let data = await AutoModel.findOneAndUpdate(
      userId,
      { $set: { text } },
      { new: true, upsert: true }
    );
    await User.findByIdAndUpdate(userId, { automated: data._id });
    res.status(201).json({
      message: "Message Added successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getMessage = async (req, res) => {
  try {
    let userId = req.userID;
    let data = await AutoModel.findOne({ userId });
    res.status(200).send({
      msg: "Message retrived successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
