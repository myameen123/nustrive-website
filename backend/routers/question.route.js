import express from "express";
import {
  add,
  getAll,
  get,
  update,
  Delete,
} from "../controllers/question.controller.js";

const router = express.Router();

router.post("/add", add);

router.get("/get/:testId", getAll);

router.get("/get/:id", get);

router.put("/update/:id", update);

router.delete("/delete/:id", Delete);


export default router;