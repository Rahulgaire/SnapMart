const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendOtp } = require("../utils/otp");

const register = async (req, res) => {
  try {
    const { name, email, password,role } = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
      return res.status(400).json({message:"Please provide all details"});
    }
    let detailsRole  = role || 'user'
 
    // Check if user already exists first
    const existedUser = await User.findOne({ email });

    if (existedUser && existedUser.isVerified) {
      // User is verified, reject registration without modifying user's data
      return res.status(400).json({
        message: "User already exists",
        user: {
          id: existedUser._id,
          name: existedUser.name,
          email: existedUser.email,
        },
      });
    }

    // Generate OTP and hash password only if user not verified or new
    const otp = await sendOtp(email);
    if (otp === -1) {
      return res.status(500).json({message:"Failed to send OTP"});
    }

    const hashPassword = await bcrypt.hash(password, 10);

    if (existedUser && !existedUser.isVerified) {
      // Update existing unverified user with new password and OTP
      existedUser.password = hashPassword;
      existedUser.otp = otp;
      await existedUser.save();

      return res.status(201).json({
        message: "OTP resent to your email",
        user: {
          id: existedUser._id,
          name: existedUser.name,
          email: existedUser.email,
        },
      });
    }

    // Create a new user if none exists
    const user = new User({
      name,
      email,
      role:detailsRole,
      password: hashPassword,
      otp: otp,
      isVerified: false,
    });

    const savedUser = await user.save();

    return res.status(201).json({
      message: `Otp Sent to ${savedUser.email} `,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role:savedUser.role
      },
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    if (!email || !password) {
      return res.status(400).json({message:"Please provide all details"});
    }

    const existedUser = await User.findOne({ email });

    // BUG FIX: This check should be before bcrypt.compare
    if (!existedUser) {
      return res.status(400).json({message:"Email is invalid"});
    }
    if (!existedUser.isVerified) {
      return res.status(400).json({message:"User is not verified. Please verify your email."});
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existedUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({message:"Password is invalid"});
    }

    const payload = {
      id: existedUser._id,
      role: existedUser.role,
    };

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    }); // optional expiry
    // console.log(jwtToken);

    // Send cookie with httpOnly flag
    return res
      .cookie("token", jwtToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production", // secure in production only
        sameSite: "none",
        secure: true,
        path:'/'
        // maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({ message: "User logged in successfully", role: existedUser.role ,token:jwtToken,isVerified:existedUser.isVerified});
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
     res.status(200).send("User logged out successfully");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otpCode } = req.body;

    if (!email || !otpCode) {
      return res.status(400).send("Please provide email and OTP");
    }

    const existedUser = await User.findOne({ email });
    if (!existedUser) {
      return res.status(400).send("Email is invalid");
    }

    if (existedUser.otp !== otpCode) {
      return res.status(400).send("Invalid OTP");
    }
    if (existedUser.isVerified) {
      return res.status(400).send("User already verified");
    }

    // Set user as verified
    existedUser.isVerified = true;
    existedUser.otp = ""; // Clear OTP after verification
    await existedUser.save();


    const payload = { id: existedUser._id, role: existedUser.role };
    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .cookie("token", jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({message:"OTP verified successfully",
        message2:"User Created Successfully"
      });
  } catch (error) {
    console.error("Verify OTP Error:", error.message);
    return res.status(500).send("Internal Server Error");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password -otp");
    return res.status(200).json({users:users});
  } catch (error) {
    console.error("Get All Users Error:", error.message);
    return res.status(500).send("Internal Server Error");
  }
};


module.exports = {
  login,
  register,
  logout,
  verifyOtp,
  getAllUsers
};
