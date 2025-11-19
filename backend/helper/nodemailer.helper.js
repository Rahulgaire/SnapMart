const nodemailer = require("nodemailer");

const sendOtp = async (req, res) => {
    try {
        const { email, otpCode } = req.body;

        if (!email || !otpCode) {
            return res.status(400).send("Please provide email and OTP");
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

       const mailOptions = {
      from: `"SnapMart Support" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Hello,\n\nYour OTP code is: ${otpCode}\n\nPlease do not share this code with anyone. It is valid for the next 10 minutes.\n\nThis is an auto-generated message. Do not reply to this email.\n\nBest regards,\nSnapMart Team`,
    };

        await transporter.sendMail(mailOptions);
        return res.status(200).send("OTP sent successfully");
    } catch (error) {
        console.error("Send OTP Error:", error.message);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = { sendOtp };