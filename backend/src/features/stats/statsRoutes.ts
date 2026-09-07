import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth/authenticate";
import { authorizeAdmin } from "../../shared/middlewares/auth/authorizeAdmin";
import {
  adminDashboardSalesController,
  adminDashboardStatsController,
} from "./admin/statsController";
import { authorizeSeller } from "../../shared/middlewares/auth/authorizeSeller";
import { getSellerDashboardStatsController } from "./seller/sellerStatsController";

const statsRouter = Router();

statsRouter.get(
  "/dashboard",
  authenticate,
  authorizeAdmin,
  adminDashboardStatsController,
);
statsRouter.get(
  "/dashboard/sales",
  authenticate,
  authorizeAdmin,
  adminDashboardSalesController,
);

statsRouter.get(
  "/seller",
  authenticate,
  authorizeSeller,
  getSellerDashboardStatsController,
);

export default statsRouter;
