let mongoose = require("mongoose");

let pushNotificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  role: {
    type: String,
    enum: ["patient", "donor", "admin"],
    required: true,
  },
  title: String,
  message: String,
  isRead: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

let PushNotification = mongoose.model("PushNotification", pushNotificationSchema);

module.exports = PushNotification;