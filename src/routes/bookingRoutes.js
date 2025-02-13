const express = require("express");
const { createBooking, getAllBookings } = require("../controllers/bookingController");
const { authMiddleware } = require("../middleware/authMiddleware"); 
const router = express.Router();

router.post("/", authMiddleware, createBooking);
router.get("/", authMiddleware, getAllBookings);

module.exports = router;
