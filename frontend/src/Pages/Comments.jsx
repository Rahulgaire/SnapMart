import React, { useState } from 'react';

const Comments = ({id}) => {
  const [comments, setComments] = useState([
    { id: 1, author: 'Rahul', text: 'Great product!' },
    { id: 2, author: 'Sara', text: 'Really useful and affordable.' },
  ]);

  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === '' || author.trim() === '') return;

    const comment = {
      id: comments.length + 1,
      author,
      text: newComment,
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setAuthor('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Comments</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: New Comment Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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

        {/* Right: Comment List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 border rounded shadow-sm bg-white"
            >
              <p className="font-semibold text-gray-800">{comment.author}</p>
              <p className="text-gray-600">{comment.text}</p>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
