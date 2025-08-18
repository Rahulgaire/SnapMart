const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.id = payload.id;
    next();
  } catch (error) {
   return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authentication;
