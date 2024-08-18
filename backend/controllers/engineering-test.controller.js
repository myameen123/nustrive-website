import EngineeringTest from "../models/engineering-test.model.js";

// Create a new test
export const addTest = async (req, res) => {
    try {
        const { title, description } = req.body;
        console.log('req.body', req.body)
        const newTest = new EngineeringTest({ title, description });
        console.log('newTest: ', newTest);
        await newTest.save();
        res.status(201).json(newTest);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};

// Get all tests
export const getTests = async (req, res) => {
    try {
        const tests = await EngineeringTest.find().populate('questions');
        res.status(200).json(tests);
    } catch (err) {
        console.log('err.message',err.message);
        res.status(500).json({ error: err.message });
    }
};

// Get a single test by ID
export const getTestById = async (req, res) => {
    try {
        const { id } = req.params;
        const test = await EngineeringTest.findById(id).populate('questions');
        if (!test) return res.status(404).json({ error: "Test not found" });
        res.status(200).json(test);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};

// Update a test by ID
export const updateTest = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedTest = await EngineeringTest.findByIdAndUpdate(id, { title, description }, { new: true });
        if (!updatedTest) return res.status(404).json({ error: "Test not found" });
        res.status(200).json(updatedTest);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};

// Delete a test by ID
export const deleteTest = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTest = await EngineeringTest.findByIdAndDelete(id);
        if (!deletedTest) return res.status(404).json({ error: "Test not found" });
        res.status(200).json({ message: "Test deleted successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};
