let Notification = require("../Models/Notification");

let DeleteNotification = async (req, res) => {
  try {
    let { id } = req.params;

    let notification = await Notification.findByIdAndDelete(id);
    if (!notification) {
      return res.status(404).send({success: false, message: "Notification not found"});
    }
    return res.status(200).send({success: true, message: "Notification deleted successfully"});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = DeleteNotification;