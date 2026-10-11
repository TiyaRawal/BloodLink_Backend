let Patient = require("../Models/Patient");

let UpdatePatientProfile = async (req, res) => {
  try {
    let patientId = req.user.userId;
    let {firstName, middleName, lastName, phone, state, city, address, pincode} = req.body;

    let update = {};
    if (firstName) {
      update.firstName = firstName;
    }
    if (middleName) {
      update.middleName = middleName;
    }
    if (lastName) {
      update.lastName = lastName;
    }
    if (phone) {
      update.phone = phone;
    }
    if (state) {
      update.state = state;
    }
    if (city) {
      update.city = city;
    }
    if (address) {
      update.address = address;
    }
    if (pincode) {
      update.pincode = pincode;
    }

    if (Object.keys(update).length === 0) {
      return res.status(400).send({success: false, message: "No fields provided for update"});
    }

    let updatedPatient = await Patient.findByIdAndUpdate(patientId, update, {new: true, runValidators: true}).select("-password");

    if (!updatedPatient) {
      return res.status(404).send({success: false, message: "Patient not found"});
    }
    return res.status(200).send({success: true, message: "Profile updated successfully", data: updatedPatient});
  } catch (e) {
    return res.status(500).send({success: false, message: "Internal Server Error"});
  }
};

module.exports = UpdatePatientProfile;