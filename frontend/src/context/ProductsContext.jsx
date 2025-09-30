import React, { createContext, useState } from 'react';

// 1. Create context
export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://snapmart-backend.onrender.com/api/products");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch products");
      setProducts(data.products || []);
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
