import SubjectTest from "../models/subject-test.model.js";

// Add a new subject test
export const add = async (req, res) => {
  const { title, description, subject, questions, createBy } = req.body;

  try {
    const newTest = new SubjectTest({
      title,
      description,
      subject,
      questions,
      createBy,
    });

    await newTest.save();
    res.status(201).json(newTest);
  } catch (error) {
    res.status(500).json({ message: "Failed to create test", error });
  }
};

// Update a subject test
export const update = async (req, res) => {
  const { id } = req.params;
  const { title, description, subject, questions, createBy } = req.body;

  try {
    const updatedTest = await SubjectTest.findByIdAndUpdate(
      id,
      {
        title,
        description,
        subject,
        questions,
        createBy,
      },
      { new: true }
    );

    if (!updatedTest) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json(updatedTest);
  } catch (error) {
    res.status(500).json({ message: "Failed to update test", error });
  }
};

// Delete a subject test
export const deletE = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTest = await SubjectTest.findByIdAndDelete(id);

    if (!deletedTest) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete test", error });
  }
};

// Get a single subject test by ID
export const get = async (req, res) => {
  const { id } = req.params;

  try {
    const test = await SubjectTest.findById(id).populate("questions");

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch test", error });
  }
};

// Get all subject tests
export const getAll = async (req, res) => {
  try {
    const tests = await SubjectTest.find().populate("questions");
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tests", error });
  }
};
