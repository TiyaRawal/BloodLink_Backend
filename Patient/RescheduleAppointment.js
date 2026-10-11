let Appointment = require("../Models/Appointment");

let RescheduleAppointment = async (req, res) => {
  try {
    let {id} = req.params;
    let {appointmentDate, appointmentTime} = req.body;
    if (!appointmentDate || !appointmentTime) {
      return res.status(400).send({success: false, message: "Appointment date and time are required"});
    }

    let appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).send({success: false, message: "Appointment not found"});
    }

    if (appointment.status !== "Scheduled") {
      return res.status(400).send({success: false, message: "Only scheduled appointments can be rescheduled"});
    }

    appointment.appointmentDate = appointmentDate;
    appointment.appointmentTime = appointmentTime;

    await appointment.save();

    return res.status(200).send({success: true, message: "Appointment rescheduled successfully", appointment: appointment});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = RescheduleAppointment;