let GetBloodGroupsAPI = (req, res) => {
  try {
    let bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    return res.status(200).send({success: true, bloodGroups: bloodGroups});
  } catch (e) {
    return res.status(500).send({success: false, message: "Something went wrong"});
  }
};

module.exports = GetBloodGroupsAPI;