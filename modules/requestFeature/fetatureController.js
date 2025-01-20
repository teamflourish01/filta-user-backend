const nodemailer = require("nodemailer");
const User = require("../user/userSchema");

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
exports.sendEmail = async (req, res) => {
  const { title, module, describe } = req.body;
  const userId = req.userID;
  if (!title || !describe) {
    return res.status(400).json({
      message: "All Field Are Required",
    });
  }
  try {
    const userData = await User.findById(userId).populate("card");
    const userName = userData.card.name || "Unknown User";
    const userEmail = userData.email || "Unknown Email";

    if (!userData || !userData.email) {
      return res.status(404).json({
        message: "User Not Found | Email is not exist.",
      });
    }
    const userMailOptions = {
      from: process.env.EMAIL,
      to: userData?.email,
      subject: "Filta Request a Feature",
      html: `
      <div style="background-color: #f7f7f7; padding: 20px; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px; text-align: center; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333;">Filta.in</h2>
          <div style="border-top: 2px solid #eee; margin: 10px 0;"></div>
          <p style="font-size: 16px; color: #555;">
            Thankyou For Your Message Filta Will Be Connect ...!
          </p>
          <div style="border-top: 2px solid #eee; margin: 20px 0;"></div>
          <p style="font-size: 14px; color: #999;">This is a Filta.in automated email. Please do not reply.</p>
        </div>
      </div>
    `,
    };
    const clientMailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "Filta Request a Feature",
      html: `
    <div style="background-color: #f7f7f7; padding: 20px; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px; text-align: center; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">Request a Feature</h2>
        <div style="border-top: 2px solid #eee; margin: 10px 0;"></div>
        <table style="width: 100%; text-align: left; font-size: 16px; color: #555; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0;"><strong>User Name:</strong></td>
            <td style="padding: 8px 0;">${userName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>User Email:</strong></td>
            <td style="padding: 8px 0;">${userEmail}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Title:</strong></td>
            <td style="padding: 8px 0;">${title}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Module:</strong></td>
            <td style="padding: 8px 0;">${module}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Describe Your Request:</strong></td>
            <td style="padding: 8px 0;">${describe}</td>
          </tr>
        </table>
        <div style="border-top: 2px solid #eee; margin: 20px 0;"></div>
        <p style="font-size: 14px; color: #999;">This is a Filta.in automated email. Please do not reply.</p>
      </div>
    </div>
  `,
    };

    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);
    res.status(201).json({
      message: "Email Sent successfully.",
    });
  } catch (error) {
    res.status(500).send({
      error,
      message: error.message,
    });
  }
};
