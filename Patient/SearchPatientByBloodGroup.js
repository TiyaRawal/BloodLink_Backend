let Patient = require("../Models/Patient");

let SearchPatientByBloodGroup = async (req, res) => {
  try {
    let {bloodGroup} = req.query;
    if (!bloodGroup) {
      return res.status(400).send({success: false, message: "Blood group is required"});
    }

    let patients = await Patient.find({
      bloodGroup: bloodGroup,
    });
    if (patients.length === 0) {
      return res.status(404).send({success: false, message: "No patients found with this blood group"});
    }

    return res.status(200).send({success: true, patients: patients});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = SearchPatientByBloodGroup;