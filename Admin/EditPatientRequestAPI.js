let PatientBloodRequest = require("../Models/PatientBloodRequest");

let EditPatientRequest = async (req, res) => {
  try {
    let { id } = req.params;
    let { bloodGroup, quantity, location, city, status } = req.body;

    let request = await PatientBloodRequest.findById(id);
    if (!request) {
      return res.status(404).send({success: false, message: "Patient blood request not found"});
    }

    if (bloodGroup !== undefined) {
      request.bloodGroup = bloodGroup;
    }
    if (quantity !== undefined) {
      request.quantity = quantity;
    }
    if (location !== undefined) {
      request.location = location;
    }
    if (city !== undefined) {
      request.city = city;
    }
    if (status !== undefined) {
      if (!["Pending", "Approved", "Rejected", "Completed"].includes(status)) {
        return res.status(400).send({success: false, message: "Invalid status"});
      }
      request.status = status;
    }

    await request.save();

    return res.status(200).send({success: true, message: "Patient blood request updated successfully", request: request});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = EditPatientRequest;