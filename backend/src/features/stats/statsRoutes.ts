import { Router } from "express";
import { authenticate } from "../../shared/middlewares/auth/authenticate";
import { authorizeAdmin } from "../../shared/middlewares/auth/authorizeAdmin";
import { adminDashboardStatsController } from "./admin/statsController";

const statsRouter = Router();

statsRouter.get(
  "/dashboard",
  authenticate,
  authorizeAdmin,
  adminDashboardStatsController,
);

export default statsRouter;
