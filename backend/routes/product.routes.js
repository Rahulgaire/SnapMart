const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controller");
const authentication = require("../middleware/authentication.middleware");
const {allowedRoles} = require("../middleware/roleAccess");
const uploadSingleImage = require("../helper/upload.helper");

router.post("/",authentication,allowedRoles('admin'),uploadSingleImage('image'),createProduct);             // Create
router.get("/",authentication, getAllProducts);             // Read All
router.get("/:id", getProductById);          // Read One
router.put("/:id",authentication,allowedRoles('admin'),uploadSingleImage('image'), updateProduct);           // Update
router.delete("/:id",authentication,allowedRoles('admin'), deleteProduct);        // Delete
module.exports = router;
