let mongoose = require("mongoose");

let patientBloodRequestSchema = new mongoose.Schema({
  patientId: {type: mongoose.Schema.Types.ObjectId, ref: "Patient"},
  bloodGroup: String,
  quantity: Number,
  location: String,
  city: String,
  requestDate: String,
  status: {type: String, enum: ["Pending", "Approved", "Rejected", "Completed"], default: "Pending"}
});

let PatientBloodRequest = mongoose.model("PatientBloodRequest", patientBloodRequestSchema);

module.exports = PatientBloodRequest;