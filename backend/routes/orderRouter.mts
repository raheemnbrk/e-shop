import { Router } from "express";
import { placeOrder } from "../controllers/orderController.mts";
import authUser from "../middlewares/authUser.mts";

const orderRouter = Router();

orderRouter.post("/place-order", authUser, placeOrder);

export default orderRouter;
