const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    // Don't kill the server abruptly so Railway healthchecks can still pass
    // process.exit(1);
    throw error;
  }
};

module.exports = connectDB;
