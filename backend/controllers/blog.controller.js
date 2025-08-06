const Blog = require('../model/Blog.model');
const { uploadToCloudinary } = require('../config/cloudinary');

// GET all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Optional: sorted latest first
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
};

// POST a new blog
const createBlog = async (req, res) => {
  try {
    // Check if image is uploaded
    const image = req.files?.image;
    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Upload to Cloudinary
    const imageUrl = await uploadToCloudinary(image);

    // Create and save blog
    const newBlog = new Blog({ ...req.body, img: imageUrl });
    await newBlog.save();

    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error });
  }
};

module.exports = {
  getAllBlogs,
  createBlog
};
