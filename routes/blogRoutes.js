// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const { createBlog, getAllBlogs, updateBlog, deleteBlog, getBlogById } = require('../controllers/blogController');

// Create blog route
router.post('/', upload.single('image'), createBlog);

// Get all blogs route
router.get('/', getAllBlogs);

// Update blog route
router.put('/:id', upload.single('image'), updateBlog);

// Delete blog route
router.delete('/:id', deleteBlog);
router.get('/:id', getBlogById);

module.exports = router;
