const User = require("../user/userSchema");
const Card = require("./cardSchema");

// exports.addCard = async (req, res) => {
//   const {
//     name,
//     jobtitle,
//     company,
//     email,
//     phonenumber,
//     location,
//     bio,
//     profileStyle,
//   } = req.body;
//   const userId = req.userID;
//   try {
//     const newProfile = new Card({
//       userId,
//       name,
//       jobtitle,
//       company,
//       email,
//       phonenumber,
//       location,
//       bio,
//       profileimg: {
//         url: req.files["profileimg"] ? req.files["profileimg"][0].path : null,
//         style: profileStyle === "circle",
//       },
//       coverimg: req.files["coverimg"] ? req.files["coverimg"][0].path : null,
//       logoimg: req.files["logoimg"] ? req.files["logoimg"][0].path : null,
//     });

//     await newProfile.save();

//     await User.findByIdAndUpdate(userId, { card: newProfile._id });

//     res.status(201).json({
//       message: "Card created successfully",
//       data: newProfile,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error creating profile" });
//   }
// };

exports.addCard = async (req, res) => {
  console.log("body", req.body);

  try {
    const profileimg =
      req.files && req.files["profileimg"]
        ? req.files["profileimg"][0].filename
        : undefined;
    const coverimg =
      req.files && req.files["coverimg"]
        ? req.files["coverimg"][0].filename
        : undefined;
    const logoimg =
      req.files && req.files["logoimg"]
        ? req.files["logoimg"][0].filename
        : undefined;

    const profileStyle = req.body.profileStyle === "circle" ? true : false;
    const userId = req.userID;

    const data = new Card({
      ...req.body,
      userId,
      style: profileStyle,
    });
    if (profileimg) data.profileimg = profileimg;
    if (coverimg) data.coverimg = coverimg;
    if (logoimg) data.logoimg = logoimg;
    console.log("data", data);

    await data.save();
    await User.findByIdAndUpdate(userId, { card: data._id });
    res.status(201).json({
      message: "Card created successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating profile" });
  }
};
// Helper function to handle single image

function handleSingleImage(newFile, currentImage) {
  return newFile?.[0]?.filename || currentImage;
}

function handleMultipleImage(newFile, currentVideos) {
  let newvideos = newFile.map((e) => e?.path);
  return [...currentVideos, ...newvideos];
}
exports.editCard = async (req, res) => {
  try {
    const userId = req.userID;
    const existingData = await Card.findOne({ userId });
    if (!existingData) {
      return res.status(404).json({ error: "Card not found" });
    }

    // handle Multiple Image

    // const multimedia = handleMultipleImage(req?.files?.multimedia ,existingData.multimedia);

    // Handle single image (e.g., 'img' field)
    const profileimg = handleSingleImage(
      req.files?.profileimg,
      existingData.profileimg
    );
    const coverimg = handleSingleImage(
      req.files?.coverimg,
      existingData.coverimg
    );
    const logoimg = handleSingleImage(req.files?.logoimg, existingData.logoimg);

    const profileStyle = req.body.profileStyle === "circle" ? true : false;

    // Prepare updated fields with body data and updated image fields
    const updatedFields = {
      ...req.body,
      profileimg,
      coverimg,
      logoimg,
      // style: profileStyle,      
    };
    // Update the data in the database
    const updatedData = await Card.findOneAndUpdate({ userId }, updatedFields, {
      new: true,
    });

    res
      .status(201)
      .json({ msg: "Card updated successfully", data: updatedData });
  } catch (error) {
    res.status(500).json({ error: "Data not updated", message: error.message });
  }
};

exports.getUsercard = async (req, res) => {
  try {
    const userID = req.userID;

    const data = await Card.find({ userId: userID });
    res.status(200).json({
      message: "User cards fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
