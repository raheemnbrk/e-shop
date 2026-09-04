import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth/authenticate";
import {
  adminCancelOrderController,
  cancelOrderController,
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

orderRouter.patch("/cancel/:id", authenticate, cancelOrderController);

orderRouter.patch(
  "/admin/cancel/:id",
  authenticate,
  authorizeAdmin,
  adminCancelOrderController,
);

orderRouter.get("/:orderNumber", authenticate, getMySingleOrderController);

export default orderRouter;
