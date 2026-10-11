let WebsiteSettings = require("../Models/Settings");

let GetSettings = async (req, res) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      return res.status(404).send({success: false, message: "Website settings not found"});
    }
    return res.status(200).send({success: true, settings: settings});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

let UpdateSettings = async (req, res) => {
  try {
    let {websiteName, contactEmail, contactPhone, supportEmail} = req.body;

    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = new WebsiteSettings({});
    }
    if (websiteName !== undefined) settings.websiteName = websiteName;
    if (contactEmail !== undefined) settings.contactEmail = contactEmail;
    if (contactPhone !== undefined) settings.contactPhone = contactPhone;
    if (supportEmail !== undefined) settings.supportEmail = supportEmail;
    await settings.save();

    return res.status(200).send({success: true, message: "Website settings updated successfully", settings: settings});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = { GetSettings, UpdateSettings };