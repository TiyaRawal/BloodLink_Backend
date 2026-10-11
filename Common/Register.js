let User = require("../Models/User");
let { hashPassword } = require("../Auth/Auth");

let Register = async (req, res) => {
  try {
    let {firstName, middleName, lastName, email, phone, dateOfBirth, gender, bloodGroup, state, city, address, pincode, password,} = req.body;

    if (!firstName || !email || !phone || !password) {
      return res.status(400).send({success: false, message: "Required fields are missing",});
    }

    let userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).send({success: false, message: "User already exists",});
    }

    let hashedPassword = await hashPassword(password);

    let user = new User({
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

    await user.save();

    return res.status(201).send({success: true, message: "User registered successfully",});
  } catch (error) {
    return res.status(500).send({success: false, message: "Something went wrong",});
  }
};

module.exports = Register;
