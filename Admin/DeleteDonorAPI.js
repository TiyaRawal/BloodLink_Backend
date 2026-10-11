let Donor = require("../Models/Donor");

let DeleteDonor = async (req, res) => {
  try {
    let { id } = req.params;
    let donor = await Donor.findOne({_id: id, isDeleted: false});

    if (!donor) {
      return res.status(404).send({success: false, message: "Donor not found"});
    }
    donor.isDeleted = true;
    await donor.save();

    return res.status(200).send({success: true, message: "Donor deleted successfully"});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = DeleteDonor;