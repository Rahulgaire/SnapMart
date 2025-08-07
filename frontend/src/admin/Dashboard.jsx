import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AllProducts from './AllProducts';
import Addproducts from './Addproducts';
import Sidebar from './AdminCommon/Sidebar';
import Users from './Users';
import Blogs from './Blogs';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
        className={`
          flex-1 bg-gray-100 dark:bg-zinc-900 transition-all duration-300 ml-13
        `}
      >
        <Routes>
          <Route path="/" element={<div className="text-white text-2xl font-bold p-4">Dashboard Home</div>} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/add-product" element={<Addproducts />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
