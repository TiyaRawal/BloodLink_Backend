let AuditLog = require("../Models/AuditLog");

let GetAuditLogs = async (req, res) => {
  try {
    let auditLogs = await AuditLog.find().sort({ date: -1 });
    return res.status(200).send({success: true, auditLogs: auditLogs});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = GetAuditLogs;