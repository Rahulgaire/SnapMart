import React, { lazy, Suspense } from "react";
import { NavbarDemo } from "./common/NavbarDemo";
import { Footer } from "./common/Footer";
import { Routes, Route, useLocation } from "react-router-dom";

// ✅ Normal imports for small/critical pages
import Home from "./Pages/Home/Home";
import ProductDetails from "./Pages/Product/ProductDetails";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./Pages/Cart";
import About from "./Pages/About/About";
import Profile from "./Pages/Profile/Profile";
import { PageNotFound } from "./Pages/PageNotFound";
import Support from "./admin/Support";
import Dashboard from "./admin/Dashboard";
import Contact from "./Pages/About/Contact";

// ✅ Lazy-loaded (big) pages
const AllProducts = lazy(() => import("./Pages/Product/AllProducts"));
const Blog = lazy(() => import("./Pages/Blogs/Blog"));

const App = () => {
  const location = useLocation();
  const auth =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register");
  const profile = location.pathname.startsWith("/profile");
  const page404 = location.pathname.startsWith("*");
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div>
      {!isAdmin && <NavbarDemo />}

      {/* ✅ Wrap lazy-loaded components in Suspense */}
      <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
        <Routes>
          <Route path="/admin/*" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>

      {!isAdmin && !page404 && !auth && !profile && <Footer />}
    </div>
  );
};

export default App;
