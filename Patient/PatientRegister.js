let Patient = require("../Models/Patient");
let { hashPassword } = require("../Auth/Auth");

let PatientRegister = async (req, res) => {
  try {
    let {firstName, middleName, lastName, email, phone, dateOfBirth, gender, bloodGroup, state, city, address, pincode, password,} = req.body;

    if (!firstName || !middleName  || !lastName || !email || !phone || !dateOfBirth || !gender || !bloodGroup || !state || !city || !address || !pincode || !password) {
      return res.status(400).send({success: false, message: "Required fields are missing",});
    }

    let patientExists = await Patient.findOne({email: email, isDeleted: false});
    if (patientExists) {
      return res.status(400).send({success: false, message: "Patient already exists",});
    }

    let hashedPassword = await hashPassword(password);

    let patient = new Patient({
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: email,
      phone: phone,
      dateOfBirth: dateOfBirth,
      gender: gender,
      bloodGroup: bloodGroup,
      state: state,
      city: city,
      address: address,
      pincode: pincode,
      password: hashedPassword,
    });

    await patient.save();

    return res.status(201).send({success: true, message: "Patient registered successfully",});
  } catch (error) {
    return res.status(500).send({success: false, message: "Something went wrong",});
  }
};

module.exports = PatientRegister;
