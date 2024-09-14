// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const { getAllCourses, createCourse } = require('../controllers/courseController');

// Get all courses
router.get('/', getAllCourses);

// Create a new course
router.post('/', createCourse);

module.exports = router;

// controllers/courseController.js
const { Course } = require('../models');

const getAllCourses = async (req, res) => {
  const courses = await Course.findAll();
  res.json(courses);
};

const createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json(course);
};

module.exports = { getAllCourses, createCourse };
