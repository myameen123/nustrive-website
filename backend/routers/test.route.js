import express from "express";
import {
  add,
  get,
  getAll,
  update,
  Delete,
} from "../controllers/test.controller.js";

const router = express.Router();

router.post("/add", add);

router.get("/get/:id", get);

router.get("/get", getAll);

router.put("/update/:id", update);

router.delete("/delete/:id", Delete);

export default router;
