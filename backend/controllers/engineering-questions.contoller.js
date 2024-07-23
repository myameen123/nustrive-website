// import Questions from "../modals/enginering-questions.modal.js";
import { Engineering_Questions } from "../dummy_questions.js";
import EngineeringQuestions from "../modals/enginering-questions.modal.js";
import cloudinary from "cloudinary";
// Controller function to add a new question
async function handleUpload(file) {
  const res = await cloudinary.v2.uploader.upload(file, {
    resource_type: "auto",
    folder: "EngineeringQuestions",
  });
  return res;
}
export const addEngineeringQuestion = async (req, res) => {
  try {
    // const newQuestion = await Questions.create(req.body);
    // console.log(req.body);
    // console.log(req.files);
    const imagesLinks = [];
    const options = [];
    if (req.files.length > 0) {
      const b64 = Buffer.from(req.files[0].buffer).toString("base64");
      let dataURI = "data:" + req.files[0].mimetype + ";base64," + b64;
      const result = await handleUpload(dataURI);
      console.log("id:", result.public_id);
      console.log("url:", result.secure_url);
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    options.push(req.body.option1);
    options.push(req.body.option2);
    options.push(req.body.option3);
    options.push(req.body.option4);

    const myBody = {
      text: req.body.text,
      options,
      subject: req.body.questionSubject,
      image: imagesLinks,
    };

    await EngineeringQuestions.create(myBody);
    res.status(201).json({
      success: true,
    });
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
