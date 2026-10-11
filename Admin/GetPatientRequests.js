let PatientBloodRequest = require("../Models/PatientBloodRequest");

let GetPatientRequests = async (req, res) => {
  try {
    let patientRequests = await PatientBloodRequest.find();
    return res.status(200).send({success: true, data: patientRequests});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = GetPatientRequests;