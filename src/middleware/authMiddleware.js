const User = require("../models/userModel"); 

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];

        if (!token) return res.status(401).json({ message: "Access Denied. No Token Provided" });

        const userId = parseInt(token);
        if (isNaN(userId)) return res.status(403).json({ message: "Invalid token" });

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        req.user = { id: user.id, role: user.role }; 
        next();
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const roleMiddleware = (roles) => {
    return (req, res, next) => {
        console.log("User Role:", req.user.role); 
        console.log("Allowed Roles:", roles);

        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
        }
        next();
    };
};


module.exports = { authMiddleware, roleMiddleware };
