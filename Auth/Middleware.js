let jwt = require("jsonwebtoken");
require("dotenv").config();
let jwt_secret = process.env.JWT_SECRET;
let TokenBlacklist = require("../Models/TokenBlacklist");

let AuthMiddleWare = (role = null) => {
  return async(req, res, next) => {
  let authHeaders = req.headers["authorization"];
  if (!authHeaders) {
    return res.status(401).send({success: false, message: "Unauthorized access! Headers not provided."});
  }
  let token = authHeaders && authHeaders.split(" ")[1];
  if (!token) {
    return res.status(401).send({success: false, message: "Unauthorized access! Token not provided."});
  }

  try {
    let decoded = jwt.verify(token, jwt_secret);
    let blacklistedToken = await TokenBlacklist.findOne({token: token});

    if (blacklistedToken) {
       return res.status(401).send({success: false, message: "Unauthorized access! Token has been logged out."});
    }
    req.user = decoded;

    if (role && (!req.user.role || req.user.role.toLowerCase() !== role.toLowerCase())) {
        return res.status(403).send({success: false, message: "Access denied! You are not authorized."});
      }

    next();
  } catch (e) {
    return res.status(401).send({success: false, message: "Unauthorized access! Invalid token."});
  }
};
};

module.exports = AuthMiddleWare;
