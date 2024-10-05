import CourseContent from "../models/course-content.model.js";

// Add a new CourseContent entry
const add = async (req, res) => {
  const { course, week, file, test, link } = req.body;
  try {
    const newContent = new CourseContent({ course, week, file, test, link });
    await newContent.save();
    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add course content' });
  }
};

// Get all CourseContent entries
const getAll = async (req, res) => {
  try {
    const courseContents = await CourseContent.find()
      .populate('course')
      .populate('file')
      .populate('test')
      .populate('link');
    res.status(200).json(courseContents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course content' });
  }
};

// Get a single CourseContent by ID
const get = async (req, res) => {
  try {
    const courseContent = await CourseContent.findById(req.params.id)
      .populate('course')
      .populate('file')
      .populate('test')
      .populate('link');
    if (!courseContent) return res.status(404).json({ error: 'Course content not found' });
    res.status(200).json(courseContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course content' });
  }
};

// Update CourseContent by ID
const update = async (req, res) => {
  try {
    const updatedContent = await CourseContent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate('course')
      .populate('file')
      .populate('test')
      .populate('link');
    if (!updatedContent) return res.status(404).json({ error: 'Course content not found' });
    res.status(200).json(updatedContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update course content' });
  }
};

// Delete a CourseContent by ID
const Delete = async (req, res) => {
  try {
    const deletedContent = await CourseContent.findByIdAndDelete(req.params.id);
    if (!deletedContent) return res.status(404).json({ error: 'Course content not found' });
    res.status(200).json({ message: 'Course content deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course content' });
  }
};

export { add, getAll, get, update, Delete };
