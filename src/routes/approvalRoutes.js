const express = require("express");
const { approveBooking } = require("../controllers/approvalController");
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware"); 

const router = express.Router();

router.patch("/", authMiddleware, roleMiddleware(["Manager", "Admin"]), approveBooking); 

module.exports = router;
