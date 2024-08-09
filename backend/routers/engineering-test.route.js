import express from "express";
import { 
    addTest, 
    getTests, 
    getTestById, 
    updateTest, 
    deleteTest
} from "../controllers/engineering-test.controller.js";

const router = express.Router();

router.post('/engineering/addTest', addTest); 
router.get('/engineering/getTests', getTests);
router.get('/engineering/getTest/:id', getTestById);
router.put('/engineering/updateTest/:id', updateTest);
router.delete('/engineering/deleteTest/:id', deleteTest);


export default router;
