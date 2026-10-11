let DonorBloodDonationSchedule = require("../Models/DonorBloodDonationSchedule");

let ScheduleDonation = async (req, res) => {
  try {
    let {donationDate, donationTime, location} = req.body;

    if (!donationDate || !donationTime || !location) {
      return res.status(400).send({success: false, message: "Required fields are missing"});
    }
    let donorId = req.user.userId;

    let schedule = new DonorBloodDonationSchedule({
      donorId: donorId,
      donationDate: donationDate,
      donationTime: donationTime,
      location: location,
    });

    await schedule.save();

    return res.status(201).send({success: true, message: "Blood donation scheduled successfully"});
  } catch (error) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = ScheduleDonation;
