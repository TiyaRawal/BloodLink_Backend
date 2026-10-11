let multer = require("multer");

let csvStorage = multer.diskStorage({
  destination: (req, file, cb) => {cb(null, "uploads/csv");},
  filename: (req, file, cb) => {let uniqueName = Date.now() + "-" + file.originalname; cb(null, uniqueName);},
});

let CSVUpload = multer({storage: csvStorage, fileFilter: (req, file, cb) => {
    if (file.originalname.endsWith(".csv")) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV files are allowed"));
    }
  },
});

module.exports = CSVUpload;
