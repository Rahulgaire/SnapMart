const {createBlog, getAllBlogs, deleteOneBlog} = require('../controllers/blog.controller');
const express = require('express');
const Blogrouter = express.Router();
const  authentication = require('../middleware/authentication.middleware');
const uploadSingleImage = require('../helper/upload.helper');
const {allowedRoles} = require('../middleware/roleAccess')

Blogrouter.get('/blog', getAllBlogs);
Blogrouter.post('/blog', authentication,allowedRoles('admin'), uploadSingleImage('image'), createBlog);
Blogrouter.delete('/blog/:id',authentication,allowedRoles('admin'), deleteOneBlog);
module.exports = Blogrouter;