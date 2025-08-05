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
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

   const mailOptions = {
  from: `"SnapMart Support" <${process.env.GMAIL_USER}>`,
  to: email,
  subject: "SnapMart - Your OTP Code",
  text: `Hello,

Your OTP code is: ${otpCode}

Please do not share this code with anyone. It is valid for the next 10 minutes.

This is an auto-generated message. Do not reply to this email.

Best regards,  
SnapMart Team`,
};


    await transporter.sendMail(mailOptions);

    return otpCode;
  } catch (error) {
    console.error("Send OTP Error:", error.message);
    return -1;
  }
};


module.exports = { sendOtp };

