const Approval = require("../models/approvalModel");
const Booking = require("../models/bookingModel");
const User = require("../models/userModel");

const approveBooking = async (req, res) => {
    try {
        const { bookingId, status } = req.body;

        // Fetch user details based on req.user.id
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const role = user.role; //  Get user role from DB
        const booking = await Booking.findByPk(bookingId);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        const employee = await User.findByPk(booking.employeeId);
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        const employeeName = employee.name;

        //  Check approval flow
        if (role === "Manager" && booking.status === "Pending") {
            booking.status = "Manager Approved";
            await booking.save();

            await Approval.create({ 
                bookingId, 
                approvedBy: req.user.id, 
                role, 
                status: "Manager Approved",
                employeeName  
            });

            return res.status(200).json({ message: `Booking approved by Manager. Waiting for Admin approval.` });
        } 
        else if (role === "Admin" && booking.status === "Manager Approved") { 
            booking.status = "Approved";
            await booking.save();

            await Approval.create({ 
                bookingId, 
                approvedBy: req.user.id, 
                role, 
                status: "Approved",
                employeeName  
            });

            return res.status(200).json({ message: `Booking fully approved by Admin. Room successfully booked.` });
        } 
        else {
            return res.status(403).json({ message: "Invalid approval process. Manager must approve first." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { approveBooking };
