import express from "express";
import {
    addTest,
    getTests,
    getTestById,
    updateTest,
    deleteTest,
} from "../controllers/business-test.controller.js";

const router = express.Router();

router.post('/add', addTest);
router.get('/get', getTests);
router.get('/get/:id', getTestById);
router.put('/update/:id', updateTest);
router.delete('/delete/:id', deleteTest);

export default router;