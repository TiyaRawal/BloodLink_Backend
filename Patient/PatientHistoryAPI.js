let PatientBloodRequest = require("../Models/PatientBloodRequest");

let PatientHistory = async (req, res) => {
  try {
    let patientId = req.user.userId;
    let history = await PatientBloodRequest.find({patientId: patientId}).sort({ requestDate: -1 });

    return res.status(200).send({success: true, message: "Patient history retrieved successfully", history: history});
  } catch (error) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = PatientHistory;