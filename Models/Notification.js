let mongoose = require("mongoose");

let notificationSchema = new mongoose.Schema({
  title: {type: String, required: true},
  message: {type: String, required: true},
  type: {type: String, default: "General"}
}, {
  timestamps: true
});

let Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;