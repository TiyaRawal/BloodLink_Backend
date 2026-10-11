let BloodStock = require("../Models/BloodStock");

let FilterBloodByGroup = async (req, res) => {
  try {
    let {bloodGroup} = req.query;
    if (!bloodGroup) {
      return res.status(400).send({success: false, message: "Blood group is required"});
    }

    let bloodStock = await BloodStock.find({bloodGroup: bloodGroup});
    return res.status(200).send({success: true, data: bloodStock});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = FilterBloodByGroup;