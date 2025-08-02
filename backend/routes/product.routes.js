const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controller");
const uploadSingleImage = require("../middleware/upload.middleware");

router.post("/",uploadSingleImage('image'),createProduct);             // Create
router.get("/", getAllProducts);             // Read All
router.get("/:id", getProductById);          // Read One
router.put("/:id",uploadSingleImage('image'), updateProduct);           // Update
router.delete("/:id", deleteProduct);        // Delete

module.exports = router;
