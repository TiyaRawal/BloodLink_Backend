let mongoose = require("mongoose");

let passwordOTPSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  otp: {type: String, required: true},
  expiresAt: {type: Date, required: true, expires: 0},
});

let PasswordOTP = mongoose.model("PasswordOTP", passwordOTPSchema);

module.exports = PasswordOTP;