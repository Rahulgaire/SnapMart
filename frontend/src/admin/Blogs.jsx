import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('https://snapmart-backend.onrender.com/api/blog');
      setBlogs(res.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`https://snapmart-backend.onrender.com/api/blog/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-4 bg-gray-100 dark:bg-zinc-900 text-zinc-800 dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Blogs</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map(blog => (
          <div
            key={blog._id}
            className="bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={blog.img}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold mb-2 dark:text-white">{blog.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 flex-grow">{blog.desc}</p>
              <button
                onClick={() => deleteBlog(blog._id)}
                className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
