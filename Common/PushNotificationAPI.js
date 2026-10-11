let PushNotification = require("../Models/PushNotification");

let CreatePushNotification = async (req, res) => {
  try {
    let { userId, role, title, message } = req.body;
    if (!userId || !role || !title || !message) {
      return res.status(400).send({success: false, message: "User ID, role, title and message are required"});
    }

    let notification = new PushNotification({
      userId: userId,
      role: role,
      title: title,
      message: message,
    });

    await notification.save();

    return res.status(201).send({success: true, message: "Notification created successfully", notification: notification});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = CreatePushNotification;