let Donor = require("../Models/Donor");
let { checkPassword, createToken } = require("../Auth/Auth");

let DonorLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({success: false, message: "Email and password are required"});
    }

    let donor = await Donor.findOne({email: email, isDeleted: false});
    if (!donor) {
      return res.status(404).send({success: false, message: "Donor not found"});
    }

    let passwordMatch = await checkPassword(password, donor.password);
    if (!passwordMatch) {
      return res.status(401).send({success: false, message: "Invalid email or password"});
    }

    if (donor.status !== "Approved") {
      return res.status(403).send({success: false, message: "Donor account is not approved"});
}

    let token = createToken(donor._id, "donor");
    return res.status(200).send({success: true, message: "Donor login successful", token: token});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = DonorLogin;
