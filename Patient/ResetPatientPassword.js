let Patient = require("../Models/Patient");
let PasswordOTP = require("../Models/PasswordOTP");
let { hashPassword } = require("../Auth/Auth");

let ResetPatientPassword = async (req, res) => {
  try {
    let {email, otp, newPassword} = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).send({success: false, message: "Email, OTP and new password are required"});
    }

    let patient = await Patient.findOne({email: email});
    if (!patient) {
      return res.status(404).send({success: false, message: "Patient not found"});
    }

    let passwordOTP = await PasswordOTP.findOne({email: email, otp: otp});
    if (!passwordOTP || passwordOTP.expiresAt < new Date()) {
      return res.status(400).send({success: false, message: "Invalid or expired OTP"});
    }

    let hashedPassword = await hashPassword(newPassword);
    patient.password = hashedPassword;
    await patient.save();

    await PasswordOTP.deleteOne({email: email});
    return res.status(200).send({success: true, message: "Password reset successfully"});
  } catch (e) {
    console.log(e);
    return res.status(500).send({success: false, message: "Internal Server Error"});
  }
};

module.exports = ResetPatientPassword;