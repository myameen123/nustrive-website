import express from "express";
import multer from "multer";
import {add,get,getAll,deletE,update} from '../controllers/subject-file.controller.js'

const upload = multer({})
const router = express.Router();

router.post('/add',add);

router.get('/get',getAll);

router.get('/get/:id',get);

router.delete('/delete/:id',deletE);

router.put('/update/:id',update);

export default router;