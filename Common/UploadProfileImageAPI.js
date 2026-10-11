let User = require("../Models/User");

let UploadProfileImageAPI = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({success: false, message: "Profile image is required"});
    }

    let user = await User.findByIdAndUpdate(
      req.user.id,
      {profileImage: req.file.path},
      {new: true},
    );

    if (!user) {
      return res.status(404).send({success: false, message: "User not found"});
    }
    return res.status(200).send({success: true, message: "Profile image uploaded successfully", profileImage: req.file.path});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = UploadProfileImageAPI;