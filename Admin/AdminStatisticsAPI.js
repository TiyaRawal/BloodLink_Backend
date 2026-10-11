let Donor = require("../Models/Donor");
let Patient = require("../Models/Patient");
let Hospital = require("../Models/Hospital");
let BloodCamp = require("../Models/BloodCamp");
let PatientBloodRequest = require("../Models/PatientBloodRequest");
let DonorBloodDonationSchedule = require("../Models/DonorBloodDonationSchedule");

let AdminStatisticsAPI = async (req, res) => {
  try {
    let totalDonors = await Donor.countDocuments();
    let totalPatients = await Patient.countDocuments();
    let totalHospitals = await Hospital.countDocuments();
    let totalBloodCamps = await BloodCamp.countDocuments();
    let totalBloodRequests = await PatientBloodRequest.countDocuments();
    let totalDonations = await DonorBloodDonationSchedule.countDocuments();

    return res.status(200).send({success: true, message: "Admin statistics retrieved successfully",
      statistics: {
        totalDonors: totalDonors,
        totalPatients: totalPatients,
        totalHospitals: totalHospitals,
        totalBloodCamps: totalBloodCamps,
        totalBloodRequests: totalBloodRequests,
        totalDonations: totalDonations},
    });
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = AdminStatisticsAPI;