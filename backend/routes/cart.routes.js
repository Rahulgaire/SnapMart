const express = require("express");
const router = express.Router();
const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  getCart
} = require("../controllers/cart.controller");
const {allowedRoles} = require("../middleware/roleAccess");
const authentication = require("../middleware/authentication.middleware");

router.post("/add", authentication, allowedRoles('user'), addToCart);
router.post("/remove", authentication, allowedRoles('user'), removeFromCart);
router.post("/update", authentication, allowedRoles('user'), updateCartQuantity);
router.get("/", authentication, allowedRoles('user'), getCart);

module.exports = router;
