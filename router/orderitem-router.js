
import { createOrderItem, deleteOrderItem, getAllOrderItem, getOrderItem } from "../controller/orderitem_controller.js";
import express from'express';
import {authMiddleware} from "../middelware/auth.js";

const router = express.Router();


router.post('/',authMiddleware,createOrderItem);
router.get('/',authMiddleware,getAllOrderItem);
router.get('/:id',authMiddleware,getOrderItem );
router.delete('/:id',authMiddleware,deleteOrderItem);

export default router;
