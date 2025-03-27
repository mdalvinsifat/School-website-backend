// controllers/blogController.js
const Blog = require('../models/Blog');
const cloudinary = require('../config/cloudinary');  // Import Cloudinary config

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const { heading, description, classHeading1, classHeading2 } = req.body;

    // Handle image upload to Cloudinary
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Upload image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(req.file.path);  // Use 'path' if you're saving to disk

    // Create a new blog post
    const newBlog = new Blog({
      heading,
      description,
      classHeading1,
      classHeading2,
      image: uploadedImage.secure_url,  // Store Cloudinary URL
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Error creating blog', error });
  }
};

// Get all blog posts
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
};

// Update a blog post
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description, classHeading1, classHeading2 } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Handle image update if a new one is uploaded
    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path);  // Correct file upload path
      blog.image = uploadedImage.secure_url;  // Use the updated image URL
    }

    // Update other fields
    blog.heading = heading || blog.heading;
    blog.description = description || blog.description;
    blog.classHeading1 = classHeading1 || blog.classHeading1;
    blog.classHeading2 = classHeading2 || blog.classHeading2;

    await blog.save();
    res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error });
  }
};

// Get a single blog post by ID
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Error fetching blog', error });
  }
};


// Delete a blog post
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);  // Use findByIdAndDelete

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Error deleting blog', error });
  }
};
