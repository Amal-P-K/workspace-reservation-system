const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Booking = require("./bookingModel");
const User = require("./userModel");

const Approval = sequelize.define("Approval", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    bookingId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Booking, key: "id" } },
    employeeName: { type: DataTypes.STRING, allowNull: false },
    approvedBy: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" } },
    role: { type: DataTypes.ENUM("Manager", "Admin"), allowNull: false },
    status: { type: DataTypes.ENUM("Manager Approved","Approved", "Rejected"), allowNull: false },
}, { timestamps: false });

module.exports = Approval;