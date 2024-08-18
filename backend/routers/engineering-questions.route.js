import express from "express";
import multer from "multer";
import { 
  addEngineeringQuestion, 
  deleteQuestion, 
  updateQuestion, 
  getAllQuestions, 
  getQuestionById } 
  from "../controllers/engineering-questions.contoller.js";

const upload = multer({});
const router = express.Router();

// Route to add a new question
router.post("/add", addEngineeringQuestion);

// Route to get all questions
router.get("/get/:testId", getAllQuestions);

// Route to get a question by ID
router.get("/get/:id", getQuestionById);

// Route to update a question by ID
router.put("/update/:id", updateQuestion);

// Route to delete a question by ID
router.delete("/delete/:id", deleteQuestion);

export default router;
