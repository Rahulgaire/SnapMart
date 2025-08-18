const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const uploadToCloudinary = require("../config/cloudinary");
const getProfile = async (req, res) => {
   try {
     const id = req.id;
    const user = await User.findOne({ _id: id });
   if(!user) {
        return res.status(404).send("User not found");
    }
    return res.status(200).json({
        name: user.name,
        email: user.email,
        role: user.role,
        gender:user.gender,
        cart: user.cart,
        img:user.img,
        createdAt: user.createdAt,
    });
   } catch (error) {
    res.status(500).json({
      message:error.message
    })
   }
};

const updateProfile = async (req,res) => {
  try {
    const id = req.id;
    const { name, gender,email } = req.body;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).send("User not found");
    }
    let imageUrl = user.img;
    const file = req.file;
    if (file) {
      imageUrl = await uploadToCloudinary(file);
    }
    const updatedUser = await User.findByIdAndUpdate(id, {
      name,
      gender,
      email,
      img: imageUrl
    }, { new: true });
    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
}

const deleteProfile = async (req, res) => {
  try {
    const id = req.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).json({
      message: "Profile deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    const delUser = await User.deleteMany();

    // deleteMany() always returns an object like: { acknowledged: true, deletedCount: X }
    // It never returns null, so !delUser will not work as expected.
    
    if (delUser.deletedCount === 0) {
      return res.status(404).json({
        message: "No users available to delete"
      });
    }

    return res.status(200).json({
      message: "All users deleted successfully",
      deletedCount: delUser.deletedCount
    });

  } catch (error) {
    console.error("Error deleting users:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};

module.exports = {getProfile, updateProfile, deleteProfile,deleteAllUsers};