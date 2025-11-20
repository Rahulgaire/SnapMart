const {getCommentsByProduct, createComment, deleteComment} = require('../controllers/comments.controller');
const express = require('express');
const authentication = require('../middleware/authentication.middleware');
const commentRouter = express.Router();

commentRouter.post('/',authentication, createComment);
commentRouter.get('/:productId',authentication, getCommentsByProduct);
commentRouter.delete('/:commentId',authentication, deleteComment);

module.exports = commentRouter;