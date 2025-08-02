const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.send("please login");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.id = payload.id;
    next();
  } catch (error) {
    res.send("please login");
  }
};

module.exports = authentication;
