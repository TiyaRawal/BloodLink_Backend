let DonorBloodDonationSchedule = require("../Models/DonorBloodDonationSchedule");

let DonorHistory = async (req, res) => {
  try {
    let donorId = req.user.userId;
    let history = await DonorBloodDonationSchedule.find({donorId: donorId}).sort({donationDate: -1});

    return res.status(200).send({success: true, message: "Donor history retrieved successfully", history: history});
  } catch (error) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = DonorHistory;