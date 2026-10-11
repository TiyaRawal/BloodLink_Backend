let mongoose = require("mongoose");

let settingsSchema = new mongoose.Schema({
  websiteName: String,
  contactEmail: String,
  contactPhone: String,
  supportEmail: String,
});

let Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;