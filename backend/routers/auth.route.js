import express from "express";
import { loginUser } from "../controlers/auth.controler.js";
const router = express.Router();

router.post("/login", loginUser);
export default router;
