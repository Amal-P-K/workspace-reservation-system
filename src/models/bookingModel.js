const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./userModel");

const Booking = sequelize.define("Booking", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    employeeId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" } },
    employeeName: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    status: { type: DataTypes.ENUM("Pending", "Manager Approved","Approved", "Rejected"), defaultValue: "Pending" }
}, { timestamps: false });

module.exports = Booking;