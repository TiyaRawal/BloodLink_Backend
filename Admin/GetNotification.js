let Notification = require("../Models/Notification");

let GetNotification = async (req, res) => {
  try {
    let notification = (await Notification.find()).toSorted({createdAt: -1});
    if (!notification) {
      return res.status(404).send({success: false, message: "No notification found"});
    }
    return res.status(200).send({success: true, message: "Notification retrieved successfully", notification: notification});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = GetNotification;