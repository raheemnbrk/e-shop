import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth/authenticate";
import { placeOrderController } from "./orderController";

const orderRouter = Router();

orderRouter.post("/place-order", authenticate, placeOrderController);

export default orderRouter