const User = require("../model/user.model");
const Product = require("../model/product.model");
// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.id;
    const { productId, quantity } = req.body;

    const user = await User.findById(userId);
    const itemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      if (user.cart[itemIndex].quantity + quantity <= 0) {
        user.cart.splice(itemIndex, 1); // Remove item if quantity is zero or less
      }
      user.cart[itemIndex].quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();
    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Add to cart failed", error: error.message });
  }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.id;
    const { productId } = req.body;

    const user = await User.findById(userId);
    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();
    res.status(200).json({ message: "Product removed", cart: user.cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Remove from cart failed", error: error.message });
  }
};

// Update cart quantity
exports.updateCartQuantity = async (req, res) => {
  try {
    const userId = req.id;
    const { productId, quantity } = req.body;

    const user = await User.findById(userId);
    const item = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (item) {
      if (quantity <= 0) {
        user.cart = user.cart.filter(
          (item) => item.productId.toString() !== productId
        ); // Remove item if quantity is zero or less
      }
      item.quantity = quantity;
      await user.save();
      res.status(200).json({ message: "Quantity updated", cart: user.cart });
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Update quantity failed", error: error.message });
  }
};

// Get cart with populated products
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.id).populate("cart.productId");
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Fetch cart failed", error: error.message });
  }
};
