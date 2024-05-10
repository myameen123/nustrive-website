import express from "express";
import { addEngineeringQuestion } from "../controlers/engineering-questions.contoler.js";
import multer from "multer";
import { addBusinessQuestion } from "../controlers/business-question.controller.js";
const upload = multer({});
const router = express.Router();

router.post(
  "/addEngineeringQuestion",
  upload.array("images"),
  addEngineeringQuestion
);
router.post(
  "/addBusinessQuestion",
  upload.array("images"),
  addBusinessQuestion
);

export default router;
