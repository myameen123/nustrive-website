import Questions from "../models/question.model.js";
import cloudinary from "cloudinary";

// Controller function to add a new question
async function handleUpload(file) {
  const res = await cloudinary.v2.uploader.upload(file, {
    resource_type: "auto",
    folder: "Questions",
  });
  return res;
}

export const add = async (req, res) => {
    try {
      const { test, text, subject, option1, option2, option3, option4  } = req.body; //correctAnswer
  
      console.log("Request body in question controller:", { test, text, subject, option1, option2, option3, option4 }); 
  
      // Check if all required fields are present
      if (!test || !text || !subject || !option1 || !option2 || !option3 || !option4 ) { //|| !correctAnswer
        return res.status(400).json({ error: "All fields are required, including correct answer" });
      }
  
      // Validate that correct answer is part of options
      const options = [option1, option2, option3, option4];
    //   if (!options.includes(correctAnswer)) {
    //     return res.status(400).json({ error: "Correct answer must be one of the provided options" });
    //   }
  
      console.log('req.body', req.body);
  
      const imagesLinks = [];
  
      // Handle file upload if images are provided
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const b64 = Buffer.from(file.buffer).toString("base64");
          const dataURI = `data:${file.mimetype};base64,${b64}`;
          const result = await handleUpload(dataURI);
          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
      }
  
      const newQuestion = new Questions({
        test,
        text,
        options,
        subject,
        image: imagesLinks,
        //correctAnswer,
      });
  
      console.log("newQuestion", newQuestion);
  
      await newQuestion.save();
      res.status(201).json({
        success: true,
        newQuestion
      });
    } catch (err) {
      console.error("Error adding question:", err.message); 
      res.status(500).json({ error: "Failed to add the question" });
    }
  };
  

// Controller function to get all questions
export const getAll = async (req, res) => {
  try {
      const {testId} = req.params;
    console.log('req in controller', req.params.testId)
    const questions = await Questions.find({test:testId});
    res.json(questions);
    // console.log('in get all question')
  } catch (err) {
    console.error("Error fetching questions:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to get a question by ID
export const get = async (req, res) => {
  try {
    const question = await Questions.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(question);
  } catch (err) {
    console.error("Error fetching question:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const update = async (req, res) => {
    try {
      const { correctAnswer, options } = req.body;
  
      // Validate that correctAnswer is among the options (if provided in the update)
      if (correctAnswer && options && !options.includes(correctAnswer)) {
        return res.status(400).json({ error: "Correct answer must be one of the provided options" });
      }
  
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
      console.error("Error updating question:", err.message);
      res.status(400).json({ error: err.message });
    }
  };
  

// Controller function to delete a question by ID
export const Delete = async (req, res) => {
    try {
      const question = await Questions.findById(req.params.id);
  
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }
  
      // If there are images linked, delete them from Cloudinary
      if (question.image && question.image.length > 0) {
        for (const image of question.image) {
          await cloudinary.v2.uploader.destroy(image.public_id);
        }
      }
  
      await question.remove();
      res.json({ message: "Question deleted successfully" });
    } catch (err) {
      console.error("Error deleting question:", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  