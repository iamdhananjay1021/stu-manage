const mongoose = require("mongoose");
require("dotenv").config()
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
};

module.exports = connectDB;
