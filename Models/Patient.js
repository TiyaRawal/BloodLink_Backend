let mongoose = require("mongoose");

let patientSchema = new mongoose.Schema({
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

let Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
