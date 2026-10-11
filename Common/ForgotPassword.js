let Patient = require("../Models/Patient");
let PasswordOTP = require("../Models/PasswordOTP");
let nodemailer = require("nodemailer");
let crypto = require("crypto");

let ForgotPassword = async (req, res) => {
  try {
    let {email} = req.body;
    if (!email) {
      return res.status(400).send({success: false, message: "Email is required"});
    }
    
    let patient = await Patient.findOne({email: email});
    if (!patient) {
      return res.status(404).send({success: false, message: "Patient not found"});
    }

    let otp = crypto.randomInt(100000, 1000000).toString();
    let expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await PasswordOTP.findOneAndUpdate(
      {email: email},
      {otp: otp, expiresAt: expiresAt},
      {upsert: true, runValidators: true},
    );

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "BloodLink Password Reset OTP",
      text: `Your BloodLink password reset OTP is ${otp}. It expires in 5 minutes.`,
    });

    return res.status(200).send({success: true, message: "OTP sent successfully to your email"});
  } catch (e) {
    console.log(e);
    return res.status(500).send({success: false, message: "Failed to send OTP"});
  }
};

module.exports = ForgotPassword;