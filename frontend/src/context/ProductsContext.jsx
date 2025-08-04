import React, { createContext, useState } from 'react';

// 1. Create context
export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState("");

  const ProductsContextValue = {
    products,
    setProducts,
    filteredProducts,
    setFilteredProducts,
    searchText,
    setSearchText,
    loading,
    setLoading,
    priceRange,
    setPriceRange
  };
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://snapmart-backend.onrender.com/api/products");
      const data = await res.json();
      setProducts(data.products || []);
      setFilteredProducts(data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ProductsContext.Provider value={{ ...ProductsContextValue, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;