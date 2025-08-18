const User = require("../model/user.model");
const jwt = require("jsonwebtoken");


const authorization = (req, res, next) => {
    const token = req.cookies.token || res.headers?.authorization.split("")[1] ;
    if (!token) {
        return res.status(401).send("Please login to access this resource");
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.id = payload.id;
        req.role = payload.role;
        // Check if user exists
            if(req.role !== "admin") {
            return res.status(403).send("Access denied: Admins only");
        }
        next();
    } catch (error) {
        console.error("Authorization Error:", error.message);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = authorization;