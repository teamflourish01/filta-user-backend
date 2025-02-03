const User = require("../user/userSchema");
const { exists } = require("../user/userSchema");
const TeamModel = require("./teamSchema");

exports.addTeam = async (req, res) => {
  try {
    let userId = req.userID;
    const user = await User.findById(userId);
    if (!user || !user.premium) {
      return res.status(403).json({
        msg: "Please upgrade to the Premium plan to access this feature.",
      });
    }
    let data = await TeamModel.findOneAndUpdate(
      { userId },
      { ...req.body, userId },
      { new: true, upsert: true }
    );
    let existData = await TeamModel.findById(userId);
    console.log(existData, "existData");

    if (!existData?.email) {
      let updatedUser = await User.findByIdAndUpdate(userId, 
       { teamMember: data._id },{new:true}
      );
      console.log(updatedUser, "updatedUser");
    }
    res.status(200).send({
      msg: "Team Member Details Successfully added ",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getTeam = async (req, res) => {
  try {
    let userId = req.userID;
    let data = await TeamModel.find({ userId: userId });
    res.status(200).send({
      msg: "Team Member Details Retrived Successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTeam = async (req, res) => {
  let { id } = req.params;
  try {
    let userId = req.userID;
    let data = await TeamModel.findByIdAndDelete(id);
    res.status(200).send({
      msg: "Team Member Details Retrived Successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
