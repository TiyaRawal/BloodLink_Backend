let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let secret = process.env.JWT_SECRET;

let hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

let checkPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

let createToken = (userId, role) => {
  return jwt.sign({ userId: userId, role: role }, secret, { expiresIn: "3h" });
};

module.exports = { hashPassword, checkPassword, createToken };