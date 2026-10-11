let multer = require("multer");

let profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {cb(null, "uploads/profile")},
  filename: (req, file, cb) => {let uniqueName = Date.now() + "-" + file.originalname; cb(null, uniqueName)},
});

let profileUpload = multer({storage: profileStorage});

module.exports = profileUpload;