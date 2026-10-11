let BloodStock = require("../Models/BloodStock");

let DeleteBloodStock = async (req, res) => {
  try {
    let bloodStock = await BloodStock.findById(req.params.id);
    if (!bloodStock) {
      return res.status(404).send({success: false, message: "Blood stock not found"});
    }

    await BloodStock.findByIdAndDelete(req.params.id);

    return res.status(200).send({success: true, message: "Blood stock deleted successfully"});
  } catch (error) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = DeleteBloodStock;