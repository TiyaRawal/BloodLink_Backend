let mongoose = require("mongoose");

let donorBloodDonationScheduleSchema = new mongoose.Schema({
  donorId: {type: mongoose.Schema.Types.ObjectId, ref: "Donor", required: true},
  donationDate: String,
  donationTime: String,
  location: String,
  status: {type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled"}
});

let DonorBloodDonationSchedule = mongoose.model("DonorBloodDonationSchedule", donorBloodDonationScheduleSchema);

module.exports = DonorBloodDonationSchedule;