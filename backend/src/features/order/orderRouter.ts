import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth/authenticate";
import {
  getAdminOrdersController,
  getMyOrdersController,
  getMySingleOrderController,
  placeOrderController,
} from "./orderController";
import { authorizeAdmin } from "../../shared/middlewares/auth/authorizeAdmin";

const orderRouter = Router();

orderRouter.post("/place-order", authenticate, placeOrderController);

orderRouter.get("/my-orders", authenticate, getMyOrdersController);

orderRouter.get(
  "/admin/all",
  authenticate,
  authorizeAdmin,
  getAdminOrdersController,
);

orderRouter.get("/:orderNumber", authenticate, getMySingleOrderController);

export default orderRouter;
