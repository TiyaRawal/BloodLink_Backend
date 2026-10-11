let mongoose = require("mongoose");

let auditLogSchema = new mongoose.Schema({
  action: String,
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

let AuditLog = mongoose.model("AuditLog", auditLogSchema);

module.exports = AuditLog;
