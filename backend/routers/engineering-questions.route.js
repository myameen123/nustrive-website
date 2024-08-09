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
router.post("/engineering/addEngineeringQuestion", addEngineeringQuestion);

// Route to get all questions
router.get("/engineering/getQuestion/:testId", getAllQuestions);

// Route to get a question by ID
router.get("/engineering/getQuestion/:id", getQuestionById);

// Route to update a question by ID
router.put("/engineering/updateQuestion/:id", updateQuestion);

// Route to delete a question by ID
router.delete("/engineering/deleteQuestion/:id", deleteQuestion);

export default router;
