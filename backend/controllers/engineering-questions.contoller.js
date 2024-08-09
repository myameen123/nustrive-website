import EngineeringQuestions from "../models/enginering-questions.model.js";
import cloudinary from "cloudinary";

// Controller function to upload an image
async function handleUpload(file) {
  const res = await cloudinary.v2.uploader.upload(file, {
    resource_type: "auto",
    folder: "EngineeringQuestions",
  });
  return res;
}

// Controller function to add a new question
export const addEngineeringQuestion = async (req, res) => {
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

    const newQuestion = new EngineeringQuestions({
      test,
      text,
      options,
      subject: subject,
      image: imagesLinks,
    });

    console.log('newQuestion', newQuestion);

    await newQuestion.save();

    res.status(201).json({
      success: true,
      data: newQuestion,
    });
  } catch (err) {
    console.error("Error adding question:", err.message);
    // console.log('error',err.message);
    res.status(500).json({ error: err.message });
  }
};


// Controller function to get all questions
export const getAllQuestions = async (req, res) => {
  try {
    console.log('req in controller', req.params.testId)
    const questions = await EngineeringQuestions.find({test:req.params.testId});
    res.json(questions);
    console.log('in get all question')
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to get a question by ID
export const getQuestionById = async (req, res) => {
  try {
    const question = await EngineeringQuestions.findById(req.params.id);
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
    const updatedQuestion = await EngineeringQuestions.findByIdAndUpdate(
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
    const deletedQuestion = await EngineeringQuestions.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(deletedQuestion);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
