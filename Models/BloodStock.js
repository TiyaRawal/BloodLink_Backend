let mongoose = require("mongoose");

let bloodStockSchema = new mongoose.Schema({
  bloodGroup: String,
  quantity: Number,
  location: String,
  city: String,
});

let BloodStock = mongoose.model("BloodStock", bloodStockSchema);

module.exports = BloodStock;