console.log("Radha Radha");

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
// const { createStudent } = require("./controllers/studentControllers");

const router = require('./routes/StudentRoutes')

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/v1", router);

// Database Connection
connectDB();

// Routes
app.get("/", (req, res) => {
    res.send("This is baby home page");
});



// Start Server
app.listen(PORT, () => {
    console.log(`Server started at port number ${PORT}`);
});
