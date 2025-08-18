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
require("dotenv").config();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://snapmart-ayll.onrender.com/",
      "https://snapmart-backend.onrender.com/"
    ],
    credentials: true,
  })
);
//routes
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/auth/user", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api", contactRoute);
app.use("/api", Blogrouter);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h1>Backend is running .....</h1>");
});

// Connect to the database and start the server
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running in the port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Server Error");
  });
