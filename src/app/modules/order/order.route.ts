import express from 'express';
import { orderController } from './order.controller';

const router = express.Router();

//Route to create an order
router.post('/', orderController.createOrder);

//Route to get all orders
router.get('/', orderController.getAllOrders);

//Route to calculate the revenue of all orders
router.get('/revenue', orderController.calculateRevenue);

export const orderRoute = router;
