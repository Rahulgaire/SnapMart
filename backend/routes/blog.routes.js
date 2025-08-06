const {createBlog, getAllBlogs} = require('../controllers/blog.controller');
const express = require('express');
const Blogrouter = express.Router();
const  authentication = require('../middleware/authentication.middleware');
const uploadSingleImage = require('../middleware/upload.middleware');

Blogrouter.get('/blog', getAllBlogs);
Blogrouter.post('/blog', authentication, uploadSingleImage('image'), createBlog);

module.exports = Blogrouter;
