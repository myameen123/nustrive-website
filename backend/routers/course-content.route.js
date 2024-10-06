import express from 'express'
import { add,get,getAll,update,Delete } from '../controllers/course-content.controller.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post('/add',upload.array("file", 10), add);

router.get('/get/:id', get);

router.get('/get', getAll);

router.put('/update/:id',update);

router.delete('/delete/:id', Delete);

export default router;