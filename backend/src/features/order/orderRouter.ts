import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth/authenticate";
import { getMyOrdersController, getMySingleOrderController, placeOrderController } from "./orderController";

const orderRouter = Router();

orderRouter.post("/place-order", authenticate, placeOrderController);

orderRouter.get("/my-orders", authenticate, getMyOrdersController);

orderRouter.get("/:orderNumber", authenticate, getMySingleOrderController);

export default orderRouter;
