const Booking = require("../models/bookingModel");
const User = require("../models/userModel");

const createBooking = async (req, res) => {
    try {
        const { date } = req.body;
        const employeeId = req.user.id;
        const employee = await User.findByPk(employeeId);
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        console.log("Employee Found:", employee.name); 

        
        const booking = await Booking.create({ 
            employeeId, 
            employeeName: employee.name, 
        });

        res.status(201).json(booking);
    } catch (error) {
        console.error("Error Creating Booking:", error.message); 
        res.status(500).json({ error: error.message });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { createBooking, getAllBookings };
