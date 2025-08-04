const nodemailer = require("nodemailer");

const sendOtp = async (req, res) => {
    try {
        const { email, otpCode } = req.body;

        if (!email || !otpCode) {
            return res.status(400).send("Please provide email and OTP");
        }

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
        return res.status(200).send("OTP sent successfully");
    } catch (error) {
        console.error("Send OTP Error:", error.message);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = { sendOtp };