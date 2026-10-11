let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  email: String,
  phone: String,
  dateOfBirth: String,
  gender: String,
  bloodGroup: String,
  state: String,
  city: String,
  address: String,
  pincode: String,
  password: String,
  role: String,
  profileImage: {type: String, default: ""}
});

let User = mongoose.model("User", userSchema);

module.exports = User;
