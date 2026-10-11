let mongoose = require("mongoose");

let bloodCampSchema = new mongoose.Schema({
  campName: String,
  date: String,
  location: String,
  city: String,
  organizer: String
});

let BloodCamp = mongoose.model("BloodCamp", bloodCampSchema);

module.exports = BloodCamp;