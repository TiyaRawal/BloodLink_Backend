let Donor = require("../Models/Donor");
let { hashPassword } = require("../Auth/Auth");

let DonorRegister = async (req, res) => {
  try {
    let {firstName, middleName, lastName, email, phone, dateOfBirth, gender, bloodGroup, state, city, address, pincode, password,} = req.body;
    if (!firstName || !middleName || !lastName || !email || !phone || !dateOfBirth || !gender || !bloodGroup || !state || !city || !address || !pincode || !password) {
      return res.status(400).send({success: false, message: "Required fields are missing",});
    }

    let donorExists = await Donor.findOne({email: email, isDeleted: false});
    if (donorExists) {
      return res.status(400).send({success: false, message: "Donor already exists",});
    }

    let hashedPassword = await hashPassword(password);

    let donor = new Donor({
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
      status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
      }
    });

    await donor.save();

    return res.status(201).send({success: true, message: "Donor registered successfully",});
  } catch (error) {
    return res.status(500).send({success: false, message: "Something went wrong",});
  }
};

module.exports = DonorRegister;