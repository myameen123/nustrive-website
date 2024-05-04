import express from "express";
import { addQuestion } from "../controlers/questions.contoler.js";

const router = express.Router();

router.post("/addQuestions", addQuestion);

export default router;
