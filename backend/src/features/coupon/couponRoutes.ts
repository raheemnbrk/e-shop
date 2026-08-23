import { Router } from "express";
import { authorizeAdmin } from "../../shared/middlewares/auth/authorizeAdmin";
import {
  createCouponController,
  getAllCouponsController,
  toggleCouponController,
  updateCouponController,
} from "./couponController";
import { authenticate } from "../../shared/middlewares/auth/authenticate";

const couponRouter = Router();

couponRouter.post(
  "/create",
  authenticate,
  authorizeAdmin,
  createCouponController,
);

couponRouter.patch(
  "/update:id",
  authenticate,
  authorizeAdmin,
  updateCouponController,
);

couponRouter.patch(
  "/toggle/:id",
  authenticate,
  authorizeAdmin,
  toggleCouponController,
);

couponRouter.get("/all", authenticate, authorizeAdmin, getAllCouponsController);

export default couponRouter;
