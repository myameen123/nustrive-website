import Course from "../models/course.model.js";

// Add a new Course
const add = async (req, res) => {
  const { name, description, category, teacher } = req.body;
  try {
    const newCourse = new Course({ name, description, category, teacher });
    console.log('newCourse: ', newCourse)
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add course' });
  }
};

// Get all Courses
const getAll = async (req, res) => {
  try {
    const courses = await Course.find()//.populate('teacher');//
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

// Get a single Course by ID
const get = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)//.populate('teacher');
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
};

// Update Course by ID
const update = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )//.populate('teacher');
    if (!updatedCourse) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update course' });
  }
};

// Delete a Course by ID
const Delete = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
};

export { add, getAll, get, update, Delete };
