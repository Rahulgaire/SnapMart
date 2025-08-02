import React, { useContext, useEffect } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const {
    products,
    filteredProducts,
    searchText,
    setSearchText,
    priceRange,
    setPriceRange,
    loading,
    fetchProducts,
    setFilteredProducts,
  } = useContext(ProductsContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (searchText) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (priceRange === "under100") {
      filtered = filtered.filter((product) => product.price < 100);
    } else if (priceRange === "100to200") {
      filtered = filtered.filter(
        (product) => product.price >= 100 && product.price <= 200
      );
    } else if (priceRange === "above200") {
      filtered = filtered.filter((product) => product.price > 200);
    }

    setFilteredProducts(filtered);
  }, [searchText, priceRange, products]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button
          type="button"
          className="flex items-center px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm"
          disabled
        >
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Processing...
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Our Products</h1>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Filter by Price</option>
          <option value="under100">Under ₹100</option>
          <option value="100to200">₹100 - ₹200</option>
          <option value="above200">Above ₹200</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow p-4 bg-white hover:shadow-lg transition-transform transform hover:scale-[1.01]"
          >
            <Link to={`/products/${product._id}`} className="block">
            <img
              src={product.img || "https://via.placeholder.com/300x160?text=No+Image"}
              alt={product.title}
              className="h-40 w-full object-cover rounded bg-gray-100"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x160?text=No+Image";
              }}
              />
              </Link>
            <h2 className="mt-2 font-semibold text-lg text-gray-800">
              {product.title}
            </h2>
            <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
            <p className="mt-1 font-bold text-blue-600">₹{product.price}</p>
            <button
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
              aria-label={`Add ${product.title} to cart`}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
