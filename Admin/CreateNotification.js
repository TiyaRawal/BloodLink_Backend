let Notification = require("../Models/Notification");

let CreateNotification = async (req, res) => {
  try {
    let {title, message, type} = req.body;
    if (!title || !message) {
      return res.status(400).send({success: false, message: "Title and message are required"});
    }

    let notification = new Notification({
      title: title,
      message: message,
      type: type || "General"
    },);
    await notification.save();

    return res.status(201).send({success: true, message: "Notification created successfully", notification: notification});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = CreateNotification;
