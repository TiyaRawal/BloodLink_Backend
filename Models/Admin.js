let mongoose = require("mongoose");

let adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

let Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;