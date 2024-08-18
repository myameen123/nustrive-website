import BusinessQuestions from "../models/business-questions.model.js";
import cloudinary from "cloudinary";

// Controller function to add a new question
async function handleUpload(file) {
  const res = await cloudinary.v2.uploader.upload(file, {
    resource_type: "auto",
    folder: "BusinessQuestions",
  });
  return res;
}
export const addBusinessQuestion = async (req, res) => {
  try {
    const { test, text, subject, option1, option2, option3, option4 } = req.body;
    
    console.log("Request body in question controller:", {test, text, subject, option1, option2, option3, option4});

    if (!test || !text || !subject || !option1 || !option2 || !option3 || !option4) {
      return res.status(400).json({ error: "All fields are required" });
    }
    console.log('req.body', req.body);
    const imagesLinks = [];
    const options = [option1, option2, option3, option4];

    if (req.files && req.files.length > 0) {
      const b64 = Buffer.from(req.files[0].buffer).toString("base64");
      let dataURI = "data:" + req.files[0].mimetype + ";base64," + b64;
      const result = await handleUpload(dataURI);
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }


    const newQuestion = new BusinessQuestions({
      test,
      text,
      options,
      subject: subject,
      image: imagesLinks,
    });

    console.log("newQuestion", newQuestion);

    await newQuestion.save();
    res.status(201).json({
      success: true,
    });
  } catch (err) {
    console.error("Error adding question:", err.message);
    res.status(400).json({ error: err.message });
  }
};

// Controller function to get all questions
export const getAllQuestions = async (req, res) => {
  try {
    console.log('req in controller', req.params.testId)
    const questions = await BusinessQuestions.find({test:req.params.testId});
    res.json(questions);
    console.log('in get all question')
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to get a question by ID
export const getQuestionById = async (req, res) => {
  try {
    const question = await BusinessQuestions.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to update a question by ID
export const updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await BusinessQuestions.findByIdAndUpdate(
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

// Controller function to delete a question by ID
export const deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await BusinessQuestions.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(deletedQuestion);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
