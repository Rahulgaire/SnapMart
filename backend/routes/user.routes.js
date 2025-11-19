const express = require("express");
const {
    login,
    register,
  logout,
  verifyOtp,
  getAllUsers,
} = require("../controllers/auth.controller");
const {allowedRoles} = require("../middleware/roleAccess")

const authRouter = express.Router();
authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/logout", logout);
authRouter.post("/verify-otp", verifyOtp);
authRouter.get("/users", allowedRoles('admin'), getAllUsers);

module.exports = authRouter;