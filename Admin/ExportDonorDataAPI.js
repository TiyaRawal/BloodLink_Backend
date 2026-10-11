let Donor = require("../Models/Donor");
let { Parser } = require("json2csv");

let ExportDonorData = async (req, res) => {
  try {
    let donors = await Donor.find();
    if (donors.length === 0) {
      return res.status(404).send({success: false, message: "No donor data found"});
    }

    let fields = [
      "firstName",
      "middleName",
      "lastName",
      "email",
      "phone",
      "dateOfBirth",
      "gender",
      "bloodGroup",
      "state",
      "city",
      "address",
      "pincode",
      "status",
    ];

    let parser = new Parser({fields: fields});
    let csv = parser.parse(donors);

    res.header("Content-Type", "text/csv");
    res.attachment("donors.csv");

    return res.status(200).send(csv);
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = ExportDonorData;