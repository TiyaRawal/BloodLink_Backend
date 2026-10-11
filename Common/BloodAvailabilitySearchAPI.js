let BloodStock = require("../Models/BloodStock");

let BloodAvailabilitySearchAPI = async (req, res) => {
  try {
    let {bloodGroup, city} = req.query;
    if (!bloodGroup || !city) {
      return res.status(400).send({success: false, message: "Blood group and city are required"});
    }

    let filter = {bloodGroup: bloodGroup, city: city, quantity: { $gt: 0 }};
    let bloodStock = await BloodStock.find(filter);
    if (bloodStock.length === 0) {
      return res.status(200).send({success: true, message: "No blood available for the selected criteria", totalRecords: 0, bloodStock:[]});
    }

    return res.status(200).send({success: true, message: "Blood availability retrieved successfully", totalRecords: bloodStock.length, bloodStock: bloodStock});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = BloodAvailabilitySearchAPI;