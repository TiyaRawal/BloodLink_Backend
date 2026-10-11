let BloodStock = require("../Models/BloodStock");

let UpdateBloodStock = async (req, res) => {
  try {
    let { bloodGroup, quantity, location, city } = req.body;
    if (!bloodGroup || !quantity || !location || !city) {
      return res.status(400).send({success: false, message: "Required fields are missing"});
    }

    let bloodStock = await BloodStock.findById(req.params.id);
    if (!bloodStock) {
      return res.status(404).send({success: false, message: "Blood stock not found"});
    }

    bloodStock.bloodGroup = bloodGroup;
    bloodStock.quantity = quantity;
    bloodStock.location = location;
    bloodStock.city = city;

    await bloodStock.save();

    return res.status(200).send({success: true, message: "Blood stock updated successfully"});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = UpdateBloodStock;