// models/Product.model.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  img: String,
  price: Number,
});

module.exports = mongoose.model("Product", productSchema);


