let Notification = require("../Models/Notification");

let UpdateNotification = async (req, res) => {
  try {
    let {id} = req.params;
    let {title, message, type} = req.body;

    if (title === undefined && message === undefined && type === undefined) {
      return res.status(400).send({success: false, message: "At least one field is required to update"});
    }

    let updateData = {};
    if (title !== undefined) {
      updateData.title = title;
    }
    if (message !== undefined) {
      updateData.message = message;
    }
    if (type !== undefined) {
      updateData.type = type;
    }

    let notification = await Notification.findByIdAndUpdate(
      id,
      updateData,
      {new: true, runValidators: true}
    );

    if (!notification) {
      return res.status(404).send({success: false, message: "Notification not found"});
    }

    return res.status(200).send({success: true, message: "Notification updated successfully", notification: notification});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = UpdateNotification;