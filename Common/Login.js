let User = require("../Models/User");
let { checkPassword, createToken } = require("../Auth/Auth");

let Login = async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).send("User not found");
  }

  let passwordMatch = await checkPassword(password, user.password);
  if (!passwordMatch) {
    return res.status(401).send("Invalid password");
  }

  let token = createToken(user._id);
  return res.status(200).send({message: "Login successful", token: token,});
};

module.exports = Login;
