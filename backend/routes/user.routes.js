const express = require('express');
const authRouter = express.Router();
const {login, register,logout,verifyOtp} = require('../controllers/auth.controller');

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/logout', logout);
authRouter.post('/verify-otp', verifyOtp);
module.exports = authRouter;