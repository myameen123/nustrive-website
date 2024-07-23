import express from "express";
// import { addEngineeringQuestion } from "../controlers/engineering-questions.contoller.js";
import multer from "multer";
import { addBusinessQuestion } from "../controllers/business-question.controller.js";
import { addEngineeringQuestion } from "../controllers/engineering-questions.contoller.js";

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
