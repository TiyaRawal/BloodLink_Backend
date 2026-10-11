let mongoose = require("mongoose");

let appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  appointmentDate: String,
  appointmentTime: String,
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Scheduled",
  },
});

let Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;