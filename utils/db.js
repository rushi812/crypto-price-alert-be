const mongoose = require("mongoose");

const connectDB = async (DB) => {
  try {
    await mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then((conn) => {
        console.log("DB connection successful");
      })
      .catch((err) => console.log("Error: ", err));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
