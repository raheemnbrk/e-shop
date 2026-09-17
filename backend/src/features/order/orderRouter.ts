import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth/authenticate";
import {
  adminCancelOrderController,
  cancelOrderController,
  getAdminOrdersController,
  getMyOrdersController,
  getMySingleOrderController,
  getOrderInvoiceController,
  getSellerOrdersController,
  placeOrderController,
  stripeSuccessController,
} from "./orderController";
import { authorizeAdmin } from "../../shared/middlewares/auth/authorizeAdmin";
import { authorizeSeller } from "../../shared/middlewares/auth/authorizeSeller";

const orderRouter = Router();

orderRouter.post("/place-order", authenticate, placeOrderController);

orderRouter.get("/stripe/success", stripeSuccessController);

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

orderRouter.get(
  "/seller/all",
  authenticate,
  authorizeSeller,
  getSellerOrdersController,
);

orderRouter.get(
  "/:orderNumber/invoice",
  authenticate,
  getOrderInvoiceController,
);

orderRouter.get("/:orderNumber", authenticate, getMySingleOrderController);

export default orderRouter;
