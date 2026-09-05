import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth/authenticate";
import { authorizeAdmin } from "../../shared/middlewares/auth/authorizeAdmin";
import {
  adminDashboardSalesController,
  adminDashboardStatsController,
} from "./admin/statsController";

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

export default statsRouter;
