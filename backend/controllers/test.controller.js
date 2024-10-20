import Tests from "../models/test.model.js";

// Create a new test
export const add = async (req, res) => {
    try {
      const { title, course,week, category,duration, description } = req.body;
  
      // Validate required fields
      if (!title || !course ||!week  || !category || duration) {
        return res.status(400).json({ error: "Title, Subject, Week, Category and duration are required" });
      }
  
      const newTest = new Tests({ title, course, week, category,duration, description });
      console.log('newTest: ', newTest);
      await newTest.save();
  
      res.status(201).json(newTest);
    } catch (err) {
      console.error('Error adding test:', err.message);
      res.status(500).json({ error: err.message });
    }
  };
  

// Get all tests
export const getAll = async (req, res) => {
    try {
      // Pagination could be added here if needed
      const tests = await Tests.find().populate('questions', 'text options '); //correctAnswer
      res.status(200).json(tests);
    } catch (err) {
      console.error('Error fetching tests:', err.message);
      res.status(500).json({ error: err.message });
    }
  };
  

// Get a single test by ID
export const get = async (req, res) => {
    try {
      const { id } = req.params;
      const test = await Tests.findById(id).populate('questions', 'text options correctAnswer');
      if (!test) return res.status(404).json({ error: "Test not found" });
      res.status(200).json(test);
    } catch (err) {
      console.error('Error fetching test:', err.message);
      res.status(500).json({ error: err.message });
    }
  };
  

// Update a test by ID
export const update = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, course, category,period, description } = req.body;
  
      // Validate category if it's provided
      const validCategories = ["engineering", "business", "medical"];
      if (category && !validCategories.includes(category)) {
        return res.status(400).json({ error: "Invalid category" });
      }
  
      const updatedTest = await Tests.findByIdAndUpdate(
        id,
        { title, course, category,period, description },
        { new: true }
      );
  
      if (!updatedTest) return res.status(404).json({ error: "Test not found" });
  
      res.status(200).json(updatedTest);
    } catch (err) {
      console.error('Error updating test:', err.message);
      res.status(500).json({ error: err.message });
    }
  };


// Delete a test by ID
export const Delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTest = await Tests.findByIdAndDelete(id);
        if (!deletedTest) return res.status(404).json({ error: "Test not found" });
        res.status(200).json({ message: "Test deleted successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};
