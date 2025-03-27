// models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,  // URL for Cloudinary image
    required: true,
  },
  classHeading1: {
    type: String,
    required: true,
  },
  classHeading2: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Blog', blogSchema);
