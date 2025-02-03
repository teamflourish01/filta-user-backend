const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./userSchema");
const { expiryDate } = require("../../notifications/expiryDate");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const otpMap = new Map();

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  pool: true,
  rateLimit: 5,
});

exports.addUser = async (req, res) => {
  const { email, password, otp } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  if (!otp) {
    // Step 1: Generate and send OTP
    const generatedOtp = crypto.randomInt(100000, 999999).toString();
    otpMap.set(email, generatedOtp); // Store OTP temporarily
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify your email",
      html: `
      <div style="background-color: #f7f7f7; padding: 20px; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px; text-align: center; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #333;">Filta.in</h2>
      <div style="border-top: 2px solid #eee; margin: 10px 0;"></div>
          <p style="font-size: 16px; color: #555;">
            <strong>OTP:</strong> ${generatedOtp} <br>
          </p>
          <div style="border-top: 2px solid #eee; margin: 20px 0;"></div>
      </div>
      </div>
      `,
    };
    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({
        message: "OTP sent to your email. Please verify.",
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      return res.status(500).json({ message: "Failed to send OTP" });
    }
  } else {
    const storedOtp = otpMap.get(email);
    if (storedOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = new User({
        email,
        password: hashedPassword,
      });

      await newUser.save();

      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30d" }
      );

      res.status(201).json({
        message: "User created successfully",
        data: newUser,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating user" });
    }
  }
};
exports.GoogleSignup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({
      email,
      password,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );

    res.status(201).json({
      message: "User created successfully",
      data: newUser,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials. Please try again." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials. Please try again." });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,

      { expiresIn: "30d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
};
exports.googleLogin = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials. Please try again." });
    }   

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,

      { expiresIn: "30d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
};
exports.getUserDetails = async (req, res) => {
  const userID = req.userID;

  try {
    const user = await User.findById(userID)
      .populate("card")
      .populate("socialLinks")

      .populate("multimedia")

      .populate("voiceMessage")
      .populate("about")
      .populate("documents")
      .populate("myLeads")
      .populate("cta")
      .populate("teamMember")
      .populate("socialProof")
      .populate("photos")
      .populate("address")
      .populate("timeoffer")
      .populate("qrcode")
      .populate("productGallary")

      .populate("automated")

      .populate("nfcStandard")
      .populate("nfcPremium")
      .populate("shuffle")
      .populate("contactformemail");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User content fetched successfully",
      user:user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user content" });
  }
};
exports.getloginUser = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData ,});
  } catch (error) {
    res.status(500).json("userData not Get", error);
  }
};

exports.editUser = async (req, res) => {
  const { email, password } = req.body;
  const userId = req.userID;

  // if (!email && !password) {
  //   return res
  //     .status(400)
  //     .json({ message: "Please provide email or password to update" });
  // }
  console.log(req.body);
  

  try {
    const updates = {...req.body};

    if (email) {
      const emailExists = await User.findOne({ email });
      if (emailExists && emailExists._id.toString() !== userId) {
        return res
          .status(400)
          .json({ message: "Email already in use by another user" });
      }
      updates.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { userId: updatedUser._id, email: updatedUser.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

exports.getDataByuserName = async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username })
      .populate("card")
      .populate("socialLinks")
      .populate("multimedia")
      .populate("voiceMessage")
      .populate("about")
      .populate("documents")
      .populate("myLeads")
      .populate("cta")
      .populate("teamMember")
      .populate("socialProof")
      .populate("photos")
      .populate("address")
      .populate("timeoffer")
      .populate("qrcode")
      .populate("productGallary")
      .populate("automated")
      .populate("nfcStandard")
      .populate("nfcPremium")
      .populate("shuffle")
      .populate("contactformemail");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User content fetched By Name successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user content" });
  }
};

exports.forgatPasswordMail = async (req, res) => {
  const { email, otp, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const userExists = await User.findOne({ email });
  if (!userExists) {
    return res.status(400).json({ message: "This email is not exists" });
  }
  if (!otp) {
    // Step 1: Generate and send OTP
    const generatedOtp = crypto.randomInt(100000, 999999).toString();
    otpMap.set(email, generatedOtp);
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Forgate Password",
      html: `
        <div style="background-color: #f7f7f7; padding: 20px; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px; text-align: center; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">Filta.in</h2>
        <div style="border-top: 2px solid #eee; margin: 10px 0;"></div>
            <p style="font-size: 16px; color: #555;">
              <strong>OTP:</strong> ${generatedOtp} <br>
            </p>
            <div style="border-top: 2px solid #eee; margin: 20px 0;"></div>
        </div>
        </div>
        `,
    };
    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({
        message: "OTP sent to your email. Please verify.",
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      return res.status(500).json({ message: "Failed to send OTP" });
    }
  } else {
    const storedOtp = otpMap.get(email);
    if (storedOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.updateOne({ email }, { $set: { password: hashedPassword } });

      otpMap.delete(email);

      return res
        .status(200)
        .json({ message: "Password has been reset successfully" });
    } catch (error) {
      console.error("Error resetting password:", error);
      return res.status(500).json({ message: "Failed to reset password" });
    }
  }
};
