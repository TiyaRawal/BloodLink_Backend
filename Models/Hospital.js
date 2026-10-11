let mongoose = require("mongoose");

let hospitalSchema = new mongoose.Schema({
  hospitalName: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
});

let Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;