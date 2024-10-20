import express from "express";
import {
  add,
  get,
  getAll,
  update,
  Delete,
  getTest,
  testResponse,
} from "../controllers/mock-question.controller.js";

const router = express.Router();

router.post("/add", add);

router.get("/get", getAll);

router.get("/get/:id", get);

router.put("/update/:id", update);

router.delete("/delete/:id", Delete);

router.get("/getTest/:testId", getTest);

router.post("/testResponse/:testId", testResponse);

export default router;
