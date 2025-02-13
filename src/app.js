const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const bookingRoutes = require("./routes/bookingRoutes"); 
const authRoutes = require("./routes/authRoutes"); 
dotenv.config();
const app = express();
const approvalRoutes = require("./routes/approvalRoutes");


// Middleware to parse JSON
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api/approve", approvalRoutes);
//  Register the booking routes
app.use("/api/bookings", bookingRoutes);

sequelize.sync({ alter: true })
    .then(() => {
        console.log(" MySQL Tables Synced");
        app.listen(process.env.PORT || 5000, () => console.log(" Server Running on Port 5000"));
    })
    .catch(err => console.log(" Database Sync Error:", err));
