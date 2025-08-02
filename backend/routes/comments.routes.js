const {getCommentsByProduct, createComment, deleteComment} = require('../controllers/comments.controller');
const express = require('express');
const commentRouter = express.Router();

commentRouter.post('/', createComment);
commentRouter.get('/:productId', getCommentsByProduct);
commentRouter.delete('/:commentId', deleteComment);

module.exports = commentRouter;