import express from "express";
import { createCategory, deleteCategory, getAllCategory, getCategory, updateCategory } from "../controller/category_controller.js";
import {authMiddleware,isAdmin} from "../middelware/auth.js";
const router = express.Router();

router.post('/',authMiddleware,isAdmin,createCategory);
router.get('/',authMiddleware,getAllCategory);
router.get('/:id',authMiddleware,getCategory);
router.put('/:id',authMiddleware,isAdmin,updateCategory);
router.delete('/:id',authMiddleware,isAdmin,deleteCategory);

export default router;
