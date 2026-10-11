let Donor = require("../Models/Donor");

let DonorApproval = async (req, res) => {
  try {
    let { id } = req.params;
    let { status } = req.body;
    if (status !== "Approved" && status !== "Rejected") {
      return res.status(400).send({success: false, message: "Invalid status"});
    }

    let donor = await Donor.findById(id);
    if (!donor) {
      return res.status(404).send({success: false, message: "Donor not found"});
    }

    donor.status = status;
    await donor.save();

    return res.status(200).send({success: true, message: "Donor status updated successfully"});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = DonorApproval;