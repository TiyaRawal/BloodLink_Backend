let AuditLog = require("../Models/AuditLog");

let CreateAuditLog = async (req, res) => {
  try {
    let {action, description} = req.body;
    if (!action || !description) {
      return res.status(400).send({success: false, message: "Action and description are required"});
    }

    let auditLog = new AuditLog({
      action: action,
      description: description,
    });

    await auditLog.save();

    return res.status(201).send({success: true, message: "Audit log created successfully", auditLog: auditLog});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = CreateAuditLog;