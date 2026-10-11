let Patient = require("../Models/Patient");
let Donor = require("../Models/Donor");
let BloodStock = require("../Models/BloodStock");
let PatientBloodRequest = require("../Models/PatientBloodRequest");
let DonorBloodDonationSchedule = require("../Models/DonorBloodDonationSchedule");
let AuditLog = require("../Models/AuditLog");

let CreateIndexes = async () => {
  await Patient.collection.createIndex({ bloodGroup: 1 });
  await Patient.collection.createIndex({ email: 1 });
  await Donor.collection.createIndex({ bloodGroup: 1 });
  await Donor.collection.createIndex({ email: 1 });
  await BloodStock.collection.createIndex({ bloodGroup: 1 });
  await BloodStock.collection.createIndex({ city: 1 });
  await PatientBloodRequest.collection.createIndex({ bloodGroup: 1 });
  await PatientBloodRequest.collection.createIndex({ status: 1 });
  await DonorBloodDonationSchedule.collection.createIndex({ donorId: 1 });
  await DonorBloodDonationSchedule.collection.createIndex({ status: 1 });
  await AuditLog.collection.createIndex({ date: -1 });
  console.log("Database indexes created successfully");
};

module.exports = CreateIndexes;