import { Router } from "express";
import {
    cancelOrder,
  getALLOrders,
  getUserOrders,
  placeOrder,
} from "../controllers/orderController.mts";
import authUser from "../middlewares/authUser.mts";

const orderRouter = Router();

orderRouter.post('/place-order', authUser, placeOrder);
orderRouter.get("/get-orders", getALLOrders);
orderRouter.get("/user-orders", authUser, getUserOrders);
orderRouter.get('/cancel-order' , authUser , cancelOrder)

export default orderRouter;
