const Course = require('../models/Course');
const cloudinary = require('../config/cloudinary');

// @desc   Create a new course with image upload
// @route  POST /api/courses
// @access Public
const createCourse = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image upload is required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, { folder: "courses" });

    const course = await Course.create({ ...req.body, image: result.secure_url });
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc   Get all courses
// @route  GET /api/courses
// @access Public
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc   Get single course by ID
// @route  GET /api/courses/:id
// @access Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc   Update course by ID
// @route  PUT /api/courses/:id
// @access Public
const updateCourse = async (req, res) => {
  try {
    let updatedData = req.body;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "courses" });
      updatedData.image = result.secure_url;
    }

    const course = await Course.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc   Delete course by ID
// @route  DELETE /api/courses/:id
// @access Public
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCourse, getCourses, getCourseById, updateCourse, deleteCourse };
