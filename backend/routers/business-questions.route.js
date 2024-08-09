import express from "express";
import multer from "multer";
import { 
    addBusinessQuestion,  
    deleteQuestion, 
    updateQuestion, 
    getAllQuestions, 
    getQuestionById} 
    from "../controllers/business-question.controller.js";

const upload = multer({});
const router = express.Router();

// Route to add a new question
router.post("/addBusinessQuestion", addBusinessQuestion);

// Route to get all questions
router.get("/getQuestion/:testId", getAllQuestions);

// Route to get a question by ID
router.get("/getQuestion/:id", getQuestionById);

// Route to update a question by ID
router.put("/updateQuestion/:id", updateQuestion);

// Route to delete a question by ID
router.delete("/deleteQuestion/:id", deleteQuestion);


export default router;
