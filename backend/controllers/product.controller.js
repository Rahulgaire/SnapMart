// controllers/product.controller.js
const Product = require("../model/product.model");
const uploadToCloudinary = require("../config/Cloudinary");  

// CREATE a new product
const createProduct = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    if (!title || !price) {
      return res.status(400).json({ message: "Title and Price are required" });
    }
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "Please upload a image",
      });
    }
    const imageUrl = await uploadToCloudinary(file);
    const newProduct = await Product.create({
      title,
      description,
      img: imageUrl || "",
      price,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

// READ all products (optionally with search)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({products:products});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};
  
// READ single product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};

// UPDATE product by ID
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price } = req.body;

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    let imageUrl = existingProduct.img;
    const file = req.file;
    if (file) {
      imageUrl = await uploadToCloudinary(file);
    }
    const product = await Product.findByIdAndUpdate(
      id,
      { title, description, img: imageUrl, price },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

// DELETE product by ID
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};