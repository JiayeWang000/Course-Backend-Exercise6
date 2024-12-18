require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.uri;
const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to the database");
  } catch (e) {
    console.error("Error connecting to the database: ", e);
    process.exit(1);
  }
};
module.exports = connectToDatabase;
