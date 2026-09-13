import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth/authenticate";
import {
  applySellerController,
  getOrderController,
  getSellerCustomersController,
  getSellerProfileForAdminController,
  updateOrderStatusController,
  updateSellerController,
} from "./sellerController";
import { upload } from "../../shared/config/multer";
import {
  applyLimiter,
  updateSellerLimiter,
} from "../../shared/middlewares/limiters/sellerLimiter";
import { authorizeSeller } from "../../shared/middlewares/auth/authorizeSeller";
import { authorizeAdmin } from "../../shared/middlewares/auth/authorizeAdmin";

const sellerRouter = Router();

sellerRouter.post(
  "/apply",
  applyLimiter,
  authenticate,
  upload.single("logo"),
  applySellerController,
);

sellerRouter.patch(
  "/update",
  updateSellerLimiter,
  authenticate,
  authorizeSeller,
  upload.single("logo"),
  updateSellerController,
);

sellerRouter.get(
  "/customers",
  authenticate,
  authorizeSeller,
  getSellerCustomersController,
);

sellerRouter.get(
  "/admin/:slug",
  authenticate,
  authorizeAdmin,
  getSellerProfileForAdminController,
);

sellerRouter.patch(
  "/orders/update-status/:id",
  authenticate,
  authorizeSeller,
  updateOrderStatusController,
);

sellerRouter.get(
  "/orders/:orderNumber",
  authenticate,
  authorizeSeller,
  getOrderController,
);

export default sellerRouter;
