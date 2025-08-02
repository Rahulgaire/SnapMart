const otp = require("otp-generator");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const sendOtp = async (email) => {
  try {
    const otpCode = otp.generate(6, { upperCase: false, specialChars: false });

    // Here you would send the OTP to the user's email
    console.log(`OTP for ${email}: ${otpCode}`);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otpCode}`,
    };

    await transporter.sendMail(mailOptions);

    return otpCode;
  } catch (error) {
    console.error("Send OTP Error:", error.message);
    return -1;
  }
};


module.exports = { sendOtp };

