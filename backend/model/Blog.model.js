const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc:{ type: String, required: true },
  img: { type: String, required: true }
}, {
  timestamps: true}
)
module.exports = mongoose.model('Blog', blogSchema);
