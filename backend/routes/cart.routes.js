const express = require("express");
const router = express.Router();
const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  getCart
} = require("../controllers/cart.controller");
const authentication = require("../middleware/authentication.middleware");

router.post("/add", authentication, addToCart);
router.post("/remove", authentication, removeFromCart);
router.post("/update", authentication, updateCartQuantity);
router.get("/", authentication, getCart);

module.exports = router;
