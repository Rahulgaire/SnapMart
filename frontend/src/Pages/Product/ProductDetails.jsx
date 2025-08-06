import React, { useContext, useEffect } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import { useParams } from 'react-router-dom';
import Comments from './Comments';

const ProductDetails = () => {
  const { id } = useParams();
  const { products, fetchProducts, filteredProducts } = useContext(ProductsContext);
  const product = products.find(p => p._id === id) || filteredProducts.find(p => p._id === id);
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products, fetchProducts]);
  console.log(products);
  if (!product) {
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
          Loading product...
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.img || "https://via.placeholder.com/500x300?text=No+Image"}
              alt={product.title}
              className="w-full h-[50vh] rounded-lg shadow"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-semibold text-blue-600 mb-6">₹{product.price}</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
        <Comments id={id} />
      </div>
    </>
  );
};

export default ProductDetails;
