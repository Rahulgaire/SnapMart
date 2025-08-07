import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { Pagination } from "@/components/ui/Pagination";
import { Dialog } from "@headlessui/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import axios from "axios";

const AllProducts = () => {
  const { products, loading, fetchProducts } = useContext(ProductsContext);
  const [searchText, setSearchText] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editProduct, setEditProduct] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const itemsPerPage = 8;

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [products.length, fetchProducts]);

  useEffect(() => {
    let filtered = [...products];
    if (searchText) {
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(searchText.toLowerCase()));
    }
    if (priceRange === "under100") {
      filtered = filtered.filter((p) => p.price < 100);
    } else if (priceRange === "100to200") {
      filtered = filtered.filter((p) => p.price >= 100 && p.price <= 200);
    } else if (priceRange === "above200") {
      filtered = filtered.filter((p) => p.price > 200);
    }
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchText, priceRange, products]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const openEditModal = (product) => {
    setEditProduct(product);
    setImageFile(null);
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleEditSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title", editProduct.title);
      formData.append("price", editProduct.price);
      formData.append("description", editProduct.description);
      if (imageFile) formData.append("img", imageFile);

      await axios.put(`/api/products/${editProduct._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("Product updated!");
      fetchProducts();
      setIsEditOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`, { withCredentials: true });
      toast.success("Product deleted");
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="p-6  max-w-full mx-auto min-h-[80vh] bg-gray-100 dark:bg-zinc-900 text-zinc-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">SnapMart Products</h1>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border rounded-md px-4 py-2 bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm"
        />
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="border rounded-md px-4 py-2 bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm"
        >
          <option value="">Filter by Price</option>
          <option value="under100">Under ₹100</option>
          <option value="100to200">₹100 - ₹200</option>
          <option value="above200">Above ₹200</option>
        </select>
      </div>

      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-zinc-800 rounded-lg border border-blue-200 dark:border-zinc-700 shadow flex flex-col"
            >
              <img
                src={product.img || "https://via.placeholder.com/300x160?text=No+Image"}
                alt={product.title}
                className="w-full h-44 object-cover rounded-t-md"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="font-semibold text-xl truncate text-blue-900 dark:text-blue-300 mb-1">{product.title}</h2>
                <p className="text-sm text-blue-700 dark:text-blue-400 mb-3 line-clamp-2">{product.description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">₹{product.price}</span>
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(product)} className="px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded">Edit</button>
                    <button onClick={() => handleDelete(product._id)} className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-blue-600 mt-10">No products found.</p>
      )}

      {totalPages > 1 && (
        <div className="mt-10">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}

      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} className="fixed z-50 inset-0 ">
        <div className="flex items-center justify-center min-h-screen p-4 bg-black bg-opacity-50">
          <Dialog.Panel className="w-full max-w-md bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-xl">
            <Dialog.Title className="text-lg font-bold mb-4 text-zinc-800 dark:text-white">Edit Product</Dialog.Title>
            {editProduct && (
              <form onSubmit={(e) => e.preventDefault()} className="space-y-1">
                <div>
                  <Label>Title</Label>
                  <Input name="title" value={editProduct.title} onChange={handleEditChange} required />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input name="price" type="number" value={editProduct.price} onChange={handleEditChange} required />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input name="description" value={editProduct.description} onChange={handleEditChange} required />
                </div>
                <div>
                  <Label>Image</Label>
                  <Input name="image" type="file" accept="image/*" onChange={handleImageChange} />
                  {imageFile && (
                    <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-full h-32 object-cover rounded mt-2" />
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-zinc-700 dark:hover:bg-zinc-600">Cancel</button>
                  <button type="submit" onClick={handleEditSave} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Save</button>
                </div>
              </form>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default AllProducts;