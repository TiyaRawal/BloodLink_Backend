let TokenBlacklist = require("../Models/TokenBlacklist");

let Logout = async (req, res) => {
  try {
    let token = req.headers["authorization"].split(" ")[1];

    let blacklistToken = new TokenBlacklist({
      token: token,
    });

    await blacklistToken.save();

    return res.status(200).send({success: true, message: "Logout successful"});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = Logout;