import express from "express";

import {
  businessTestResponse,
  engineeringTestResponse,
  getBusinessTest,
  getEngineeringTest,
} from "../controllers/mock-test.controller.js";

const router = express.Router();

router.get("/getBusinessTest", getBusinessTest);
router.post("/businessTestResponse", businessTestResponse);

router.get("/getEngineeringTest", getEngineeringTest);
router.post("/engineeringTestResponse", engineeringTestResponse);

export default router;
