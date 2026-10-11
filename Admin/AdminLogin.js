let Admin = require("../Models/Admin");
let { checkPassword, createToken } = require("../Auth/Auth");

let AdminLogin = async (req, res) => {
  let { email, password } = req.body;

  let admin = await Admin.findOne({ email: email });
  if (!admin) {
    return res.status(404).send("Admin not found");
  }

  let passwordMatch = await checkPassword(password, admin.password);
  if (!passwordMatch) {
    return res.status(401).send("Invalid password");
  }

  let token = createToken(admin._id);
  return res.status(200).send({message: "Admin login successful", token: token,});
};

module.exports = AdminLogin;
