let mongoose = require("mongoose");

let tokenBlacklistSchema = new mongoose.Schema({
  token: String,
});

let TokenBlacklist = mongoose.model("TokenBlacklist", tokenBlacklistSchema);

module.exports = TokenBlacklist;