let PatientBloodRequest = require("../Models/PatientBloodRequest");

let BloodRequest = async (req, res) => {
  try {
    let {bloodGroup, quantity, location, city} = req.body;

    if (!bloodGroup || !quantity || !location || !city) {
      return res.status(400).send({success: false, message: "Required fields are missing"});
    }

    let patientId = req.user.userId;

    let request = new PatientBloodRequest({
      patientId: patientId,
      bloodGroup: bloodGroup,
      quantity: quantity,
      location: location,
      city: city,
      requestDate: new Date().toISOString(),
    });

    await request.save();

    return res.status(201).send({success: true, message: "Blood request created successfully"});
  } catch (error) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = BloodRequest;
