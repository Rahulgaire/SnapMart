const Comment = require('../model/comments.model');
const User = require('../model/user.model');

const createComment = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { productId, text } = req.body;
    if (!productId || !text) {
      return res.status(400).json({ message: 'Product ID and text are required' });
    }
    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create new comment
    const newComment = new Comment({
      userId,
      productId,
      text
    });

    await newComment.save();
    res.status(201).json({
        message: 'Comment created successfully',
        comment: newComment
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getCommentsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Validate productId
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Fetch comments for the product
    const comments = await Comment.find({ productId }).populate('userId', 'name img');

    if (comments.length === 0) {
      return res.status(404).json({ message: 'No comments found for this product' });
    }

    res.status(200).json({
        message: 'Comments fetched successfully',
        comments
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
    
        // Validate user ID and comment ID
        if (!userId || !commentId) {
        return res.status(400).json({ message: 'User ID and Comment ID are required' });
        }
    
        // Find the comment
        const comment = await Comment.findById(commentId);
        if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
        }    
        // Delete the comment
        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    }

    module.exports = {
        createComment,
        getCommentsByProduct,
        deleteComment
    };