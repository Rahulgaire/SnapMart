require("dotenv").config({ quiet: true, override: true });
const express = require("express");
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const cartRoutes = require("./routes/cart.routes");
const productRoutes = require("./routes/product.routes");
const profileRoutes = require("./routes/profile.routes");
const commentRoutes = require("./routes/comments.routes");
const cors = require("cors");
const contactRoute = require("./routes/contact.routes");
const Blogrouter = require("./routes/blog.routes");

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://snapmart-ayll.onrender.com",
    ],
    credentials: true,
  })
);

// Routes
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/auth/user", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api", contactRoute);
app.use("/api", Blogrouter);

// Test route
app.get("/", (req, res) => {
  res.send("<h1>Backend is running .....</h1>");
});

// Start server
const port = process.env.PORT || 3000;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running in the port ${port}`);
    });
  })
  .catch(() => console.log("Server Error"));
