let rateLimit = require("express-rate-limit");

let RateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {success: false, message: "Too many requests. Please try again later."},
});

module.exports = RateLimit;