let BloodStock = require("../Models/BloodStock");

let AddBloodStock = async (req, res) => {
  try {
    let {bloodGroup, quantity, location, city} = req.body;
    if (!bloodGroup || !quantity || !location || !city) {
      return res.status(400).send({success: false, message: "Required fields are missing"});
    }

    let bloodStock = new BloodStock({
      bloodGroup,
      quantity,
      location,
      city,
    });

    await bloodStock.save();

    return res.status(201).send({success: true, message: "Blood stock added successfully"});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = AddBloodStock;