let Hospital = require("../Models/Hospital");

let HospitalRegister = async (req, res) => {
  try {
    let {hospitalName, email, phone, address, city, state} = req.body;
    if (!hospitalName || !email || !phone || !address || !city || !state) {
      return res.status(400).send({success: false, message: "Required fields are missing"});
    }

    let hospitalExists = await Hospital.findOne({ email: email });
    if (hospitalExists) {
      return res.status(400).send({success: false, message: "Hospital already exists"});
    }

    let hospital = new Hospital({
      hospitalName,
      email,
      phone,
      address,
      city,
      state,
    });
    await hospital.save();

    return res.status(201).send({success: true, message: "Hospital registered successfully"});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = HospitalRegister;