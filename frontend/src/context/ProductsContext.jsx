import React, { createContext, useState } from 'react';
import axios from 'axios'
axios.defaults.withCredentials = true;
// 1. Create context
export const ProductsContext = createContext();
import toast from "react-hot-toast";
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("https://snapmart-backend.onrender.com/api/products",
        { withCredentials: true }
      );
      // console.log(res)
      if (res.statusText !== "OK") throw new Error(res.message || "Failed to fetch products");
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductsContext.Provider value={{ products, fetchProducts, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
