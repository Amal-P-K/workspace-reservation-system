const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        if (await User.findOne({ where: { email } })) 
            return res.status(400).json({ message: "User already exists" });

        const user = await User.create({ name, email, password, role });

        res.status(201).json({ message: "User registered", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        
        if (!user || password !== user.password) 
            return res.status(400).json({ message: "Invalid credentials" });

        const token = user.id;

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser, loginUser };
