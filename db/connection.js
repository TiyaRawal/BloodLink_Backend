require("dotenv").config();
let mongoose = require("mongoose");
let URL = process.env.MONGODB_URL;

let connectDb = async () => {
  try{
    await mongoose.connect(URL);
    console.log("MongoDB Connected");
  }catch (e) {
    console.log("MongoDB connection failed");
  }
};

module.exports = {connectDb};