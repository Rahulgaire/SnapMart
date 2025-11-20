import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(AuthContext);

  // Fetch all comments
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `https://snapmart-backend.onrender.com/api/comments/${id}`,
        { withCredentials: true }
      );
      setComments(res.data.comments);
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    if (id) fetchComments();
  }, [id]);

  // POST new comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await axios.post(
        "https://snapmart-backend.onrender.com/api/comments",
        {
          productId: id,
          text: newComment,
        },
        { withCredentials: true }
      );

      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error("Comment create failed", err);
    }
  };

  // DELETE comment
  const deleteComment = async (commentId) => {
    try {
      await axios.delete(
        `https://snapmart-backend.onrender.com/api/comments/${commentId}`,
        { withCredentials: true }
      );
      fetchComments();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
        Comments
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-full"
          >
            Submit Comment
          </button>
        </form>

        {/* Display ALL Comments */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="p-4 border rounded shadow-sm bg-white">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={comment.userId?.img || "/default-user.png"}
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p className="font-semibold text-gray-800">
                    {comment.userId?.name}
                  </p>
                </div>

                <p className="text-gray-600">{comment.text}</p>

                {user?._id === comment.userId?._id && (
                  <button
                    onClick={() => deleteComment(comment._id)}
                    className="mt-2 text-red-600 text-sm hover:underline"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Comments;
