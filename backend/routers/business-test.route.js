import express from "express";
import {
    addTest,
    getTests,
    getTestById,
    updateTest,
    deleteTest,
} from "../controllers/business-test.controller.js";

const router = express.Router();

router.post('/addTest', addTest);
router.get('/getTests', getTests);
router.get('/getTest/:id', getTestById);
router.put('/updateTest/:id', updateTest);
router.delete('/deleteTest/:id', deleteTest);

export default router;