const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      "Connection established",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error, "Database connection error");
    process.exit(1);
  }
};

module.exports = connectDB;
