const {createBlog, getAllBlogs, deleteOneBlog} = require('../controllers/blog.controller');
const express = require('express');
const Blogrouter = express.Router();
const  authentication = require('../middleware/authentication.middleware');
const uploadSingleImage = require('../middleware/upload.middleware');

Blogrouter.get('/blog', getAllBlogs);
Blogrouter.post('/blog', authentication, uploadSingleImage('image'), createBlog);
Blogrouter.delete('/blog/:id', deleteOneBlog);

module.exports = Blogrouter;
