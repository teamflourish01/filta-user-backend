const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();
const Contactform = require("./contactSchema");
const Loginemail = require("./loginemailSchema");
const User = require("../user/userSchema");

// login Email- Message Add-Edit Api
exports.addEmailMessage = async (req, res) => {
  const { loginemail, loginmessage, name, email, number, message } = req.body;
  const userId = req.userID;
  try {
    const existingData = await Loginemail.findOne({ userId });
    const updateData = {
      loginemail,
      loginmessage,
      name:
        name !== undefined ? !existingData?.name : existingData?.name ?? true,
      email:
        email !== undefined
          ? !existingData?.email
          : existingData?.email ?? true,
      number:
        number !== undefined
          ? !existingData?.number
          : existingData?.number ?? true,
      message:
        message !== undefined
          ? !existingData?.message
          : existingData?.message ?? true,
    };
    const data = await Loginemail.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, upsert: true }
    );

    res.status(201).json({
      message: data
        ? "Contact Form updated successfully"
        : "Contact Form Add successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getEmailMessage = async (req, res) => {
  try {
    const userID = req.userID;

    const data = await Loginemail.find({ userId: userID });
    res.status(200).json({
      message: "Login Email-Message fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Use connection pooling for better performance
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

exports.createContactmail = async (req, res) => {
  const { name, email, number, message } = req.body;
  const userId = req.userID;

  try {
    const emailMsg = await Loginemail.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });
    if (!emailMsg) {
      console.error(`No login email found for userId: ${userId}`);
      return res.status(404).send("No login email found for this user.");
    }

    const userMailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "FILTA",
      text: emailMsg.loginmessage,
      html: `<p>${emailMsg.loginmessage}</p>`,
    };

    const clientMailOptions = {
      from: process.env.EMAIL,
      to: emailMsg.loginemail,
      subject: "Filta Form Fillup User Data",
      text: `This User Filta Contact-Form submit:\n\nName: ${
        name || "-"
      }\nEmail: ${email || "-"}\nContact Number: ${number || "-"}\nMessage: ${
        message || "-"
      }`,
    };

    // Send emails concurrently
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    //save Data to DB
    const newEmail = new Contactform({
      userId,
      name,
      email,
      number,
      message,
    });
    await newEmail.save();
    await User.findByIdAndUpdate(userId, {
      $push: { myLeads: newEmail._id },
    });
    res.status(201).json({
      message: "Email Sent successfully.",
      data: newEmail,
    });
  } catch (error) {
    res.status(500).send("Error sending emails: " + error.toString());
  }
};

exports.getEmail = async (req, res) => {
  let { page, search } = req.query;
  let query = {};
  let data, total;
  try {
    if (search) {
      query.name = { $regex: `^${search}`, $options: `i` };
      data = await emailModel.find(query);
      total = data.length;
    } else {
      total = await emailModel.countDocuments(query);
      data = await emailModel
        .find(query)
        .skip((page - 1) * 12)
        .limit(12);
    }
    res.status(200).send({
      data,
      count: total,
      msg: "User found with pagination successfully",
    });
  } catch (error) {
    res.status(400).send({
      error,
      msg: error.message,
    });
  }
};
exports.deleteEmail = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await emailModel.findByIdAndDelete(id);
    res.status(200).send({
      data,
      msg: "Inquiry Removed Sucessfully",
    });
  } catch (error) {
    res.status(400).send({
      error,
      msg: error.message,
    });
  }
};
