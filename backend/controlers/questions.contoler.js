import Questions from "../modals/questions.modal.js";

// Controller function to add a new question
export const addQuestion = async (req, res) => {
  try {
    const newQuestion = await Questions.create(req.body);
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller function to delete a question by ID
export const deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await Questions.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(deletedQuestion);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to update a question by ID
export const updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await Questions.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Importing shuffle function from lodash library
