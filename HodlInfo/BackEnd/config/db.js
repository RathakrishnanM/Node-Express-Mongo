const mongoose = require("mongoose");
require("dotenv").config();

const configBD = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_DB_CONNECTION}`);

    const db = mongoose.connection;

    db.on("connected", () => {
      console.log("DB is connected successfully");
    });
    db.on("error", (err) => {
      console.log("Connection Error: ", err);
    });
    db.on("disconnected", () => {
      console.log("DB is disconnected");
    });
  } catch (err) {
    console.log("Mongo Connection Error: ", err);
  }
};

module.exports = configBD;
