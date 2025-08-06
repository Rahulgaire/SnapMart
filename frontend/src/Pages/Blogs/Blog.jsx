import React, { useState, useEffect } from "react";
import axios from "axios";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("https://snapmart-backend.onrender.com/api/blog");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0,{ behavior: "smooth" });
    fetchBlogs();
  }, []);

  const openModal = (blog) => setSelectedBlog(blog);
  const closeModal = () => setSelectedBlog(null);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg text-gray-600">
        Loading blogs...
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8 py-5 mt-2 bg-blue-50 font-serif">
        SnapMart Blog Zone
      </h1>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((post, index) => (
            <div
              key={index}
              className="border bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-700 mb-4">
                  {post.desc.length > 100
                    ? post.desc.substring(0, 100) + "..."
                    : post.desc}
                </p>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => openModal(post)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-blue-100 bg-opacity-50 flex items-center justify-center z-50 p-4 mt-10">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl relative">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              {selectedBlog.title}
            </h2>
            <img
              src={selectedBlog.img}
              alt={selectedBlog.title}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <p className="text-gray-800 whitespace-pre-wrap">{selectedBlog.desc}</p>
            <button
              onClick={closeModal}
              className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
