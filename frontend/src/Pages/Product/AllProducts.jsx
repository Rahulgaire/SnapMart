// AllProducts.jsx
import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { Link } from "react-router-dom";
import { Pagination } from "../../components/ui/Pagination";
import { HoverEffect } from "../../components/ui/card-hover-effect";

const AllProducts = () => {
  const { products, loading, fetchProducts } = useContext(ProductsContext);

  // Local filter states
  const [searchText, setSearchText] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch products on mount if none loaded
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  // Filter products locally whenever dependencies change
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
    setCurrentPage(1); // reset to first page on filter change
  }, [searchText, priceRange, products]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

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

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">SnapMart Products</h1>

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

      {/* Products Grid */}
      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow p-4 bg-white hover:shadow-lg transition-transform transform hover:scale-[1.01]"
            >
              <Link to={`/products/${product._id}`} className="block">
                <img
                  src={
                    product.img ||
                    "https://via.placeholder.com/300x160?text=No+Image"
                  }
                  alt={product.title}
                  className="h-32 sm:h-40 w-full object-cover rounded bg-gray-100"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x160?text=No+Image";
                  }}
                />
              </Link>

              <h2 className="mt-2 font-semibold text-lg text-gray-800 truncate">
                {product.title}
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>
              <p className="mt-1 font-bold text-blue-600">₹{product.price}</p>
                   <Link to={`/products/${product._id}`} className="block">
                  
              <button
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
                aria-label={`Add ${product.title} to cart`}
              >
                Get Details
              </button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">No products found.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default AllProducts;
