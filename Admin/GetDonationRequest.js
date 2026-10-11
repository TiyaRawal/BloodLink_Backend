let DonorBloodDonationSchedule = require("../Models/DonorBloodDonationSchedule");

let GetDonationRequests = async (req, res) => {
  try {
    let donationRequests = await DonorBloodDonationSchedule.find();
    return res.status(200).send({success: true, data: donationRequests});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = GetDonationRequests;