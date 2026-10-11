let mongoose = require("mongoose");

let donorSchema = new mongoose.Schema({
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
  isDeleted: {
    type: Boolean,
    default: false
  }
});

let Donor = mongoose.model("Donor", donorSchema);

module.exports = Donor;
