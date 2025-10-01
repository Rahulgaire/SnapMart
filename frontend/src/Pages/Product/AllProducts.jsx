import React, { useContext, useEffect, useState, useMemo } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { Link } from "react-router-dom";
import { Pagination } from "../../components/ui/Pagination";

const AllProducts = () => {
  const { products, fetchProducts, loading, error } = useContext(ProductsContext);

  // Local filter states
  const [searchText, setSearchText] = useState("");
  const [priceRange, setPriceRange] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch products on mount
  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, []);

  // Filter products (optimized with useMemo)
  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (searchText) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (priceRange === "under100") filtered = filtered.filter(p => p.price < 100);
    if (priceRange === "100to200") filtered = filtered.filter(p => p.price >= 100 && p.price <= 200);
    if (priceRange === "above200") filtered = filtered.filter(p => p.price > 200);
    return filtered;
  }, [searchText, priceRange, products]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

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
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Loading...
        </button>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

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
          {currentItems.map(product => (
            <div
              key={product._id}
              className="bg-blue-50 rounded-lg border border-blue-300 shadow-md hover:shadow-xl hover:border-blue-500 transform hover:-translate-y-1 transition duration-300 flex flex-col"
            >
              <Link to={`/products/${product._id}`} className="block overflow-hidden rounded-t-lg">
                <img
                  src={product.img || "https://via.placeholder.com/300x160?text=No+Image"}
                  alt={product.title}
                  className="w-full h-44 object-cover transition-transform duration-300 hover:scale-105 rounded-t-lg bg-blue-100"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x160?text=No+Image";
                  }}
                />
              </Link>

              <div className="p-4 flex flex-col flex-grow">
                <h2 className="font-semibold text-xl text-blue-900 truncate mb-1" title={product.title}>
                  {product.title}
                </h2>
                <p className="text-blue-700 text-sm mb-3 line-clamp-3">{product.description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <p className="font-bold text-blue-600 text-lg">₹{product.price}</p>
                  <Link to={`/products/${product._id}`}>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
                      aria-label={`Get details for ${product.title}`}
                    >
                      Get Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-blue-600 mt-10">No products found.</p>
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
