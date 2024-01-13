import express from "express";
import { createOrder, deleteOrder, getAllOrders, getOrder } from "../controller/orders_controller.js";
import { authMiddleware } from "../middelware/auth.js";
const router = express.Router();

router.post('/',authMiddleware,createOrder);
router.delete('/:id',authMiddleware,deleteOrder);
router.get('/',authMiddleware,getAllOrders);
router.get('/:id',authMiddleware,getOrder);

export default router;