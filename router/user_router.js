import express from "express";
import { deleteUser, getAllUsers, getUserById, login, register, updateUser } from "../controller/user_controller.js";
import {authMiddleware,isAdmin} from "../middelware/auth.js";

const router = express.Router();


router.post('/register',register);
router.post('/login',login);
router.get('/users',authMiddleware,isAdmin,getAllUsers);
router.get('/users/:id',authMiddleware,isAdmin,getUserById)
router.put('/users/:id',authMiddleware,updateUser);
router.delete('/users/:id',authMiddleware,isAdmin,deleteUser);

export default router;

