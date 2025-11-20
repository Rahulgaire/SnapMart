const User = require("../model/user.model");
const Product = require("../model/product.model");
// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const user = await User.findById(userId);

    // 🔍 Fetch product price
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const price = product.price;  // Product price from DB

    const itemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      user.cart[itemIndex].quantity += quantity;

      // Auto-remove
      if (user.cart[itemIndex].quantity <= 0) {
        user.cart.splice(itemIndex, 1);
      } else {
        // Update total price
        user.cart[itemIndex].tPrice = user.cart[itemIndex].quantity * price;
      }
    } else {
      if (quantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity" });
      }

      user.cart.push({
        productId,
        quantity,
        tPrice: quantity * price, // REQUIRED FIELD
      });
    }

    await user.save();
    res.status(200).json({ message: "Cart updated", cart: user.cart });

  } catch (error) {
    res
      .status(500)
      .json({ message: "Add to cart failed", error: error.message });
  }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
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
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const item = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Not in cart" });
    }

    if (quantity <= 0) {
      user.cart = user.cart.filter(
        (x) => x.productId.toString() !== productId
      );
    } else {
      item.quantity = quantity;
      item.tPrice = quantity * product.price;
    }

    await user.save();
    res.status(200).json({ message: "Quantity updated", cart: user.cart });

  } catch (error) {
    res
      .status(500)
      .json({ message: "Update failed", error: error.message });
  }
};

// Get cart with populated products
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("cart.productId");
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Fetch cart failed", error: error.message });
  }
};
