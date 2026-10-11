let BloodStock = require("../Models/BloodStock");
let { GetCache, SetCache } = require("./Cache");

let GetBloodStock = async (req, res) => {
  try {
    let cachedBloodStock = GetCache("bloodstock");
    if (cachedBloodStock) {
      return res.status(200).send({success: true, bloodStock: cachedBloodStock, cached: true});
    }

    let bloodStock = await BloodStock.find();
    SetCache("bloodstock", bloodStock);
    return res.status(200).send({ success: true, data: bloodStock });
  } catch (e) {
    return res.status(500).send({ success: false, message: "Something went wrong" });
  }
};

module.exports = GetBloodStock;