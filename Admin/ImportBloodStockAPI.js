let fs = require("fs");
let { parse } = require("csv-parse/sync");
let BloodStock = require("../Models/BloodStock");

let ImportBloodStock = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({success: false, message: "CSV file is required"});
    }

    let csvData = fs.readFileSync(req.file.path, "utf8");
    let rows = parse(csvData, {columns: true, skip_empty_lines: true});

    let bloodStockData = rows.map((row) => ({
      bloodGroup: row.bloodGroup,
      quantity: Number(row.quantity),
      location: row.location,
      city: row.city,
    }));

    if (bloodStockData.length === 0) {
      return res.status(400).send({success: false, message: "CSV file is empty"});
    }
    await BloodStock.insertMany(bloodStockData);

    return res.status(201).send({success: true, message: "Blood stock imported successfully", count: bloodStockData.length});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = ImportBloodStock;