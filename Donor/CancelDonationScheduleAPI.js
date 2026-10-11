let DonorBloodDonationSchedule = require("../Models/DonorBloodDonationSchedule");

let CancelDonationSchedule = async (req, res) => {
  try {
    let { id } = req.params;
    let schedule = await DonorBloodDonationSchedule.findById(id);
    if (!schedule) {
      return res.status(404).send({success: false, message: "Donation schedule not found"});
    }

    if (schedule.status !== "Scheduled") {
      return res.status(400).send({success: false, message: "Only scheduled donation can be cancelled"});
    }

    schedule.status = "Cancelled";
    await schedule.save();

    return res.status(200).send({success: true, message: "Donation schedule cancelled successfully", schedule: schedule});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = CancelDonationSchedule;