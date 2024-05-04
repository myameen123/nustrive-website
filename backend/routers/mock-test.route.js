import express from "express";

import { getBusinessTest } from "../controlers/mock-test.controller.js";

const router = express.Router();

router.get("/getBusinessTest", getBusinessTest);

export default router;
