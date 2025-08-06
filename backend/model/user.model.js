const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  tPrice: {
    type: Number,
    required: true
  },

}, { _id: false }); // Prevents _id creation for each cart item

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // fixed typo from 'require'
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  gender:{
    type:String,
    enum:["male","female"],
    required:false
  },
  otp:{
    type:String,
    required:false
  },
  isVerified:{
    type:Boolean,
    default:false
  },
  img:{
    type:String,
    default:"https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png"
  },
  cart: [cartSchema], 
},{
  timestamps: true
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;