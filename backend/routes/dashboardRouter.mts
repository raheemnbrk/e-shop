import { Router } from "express";
import {
  getAllUsers,
  getDashboardStats,
  updateUser,
} from "../controllers/dashboard.mts";
import authAdmin from "../middlewares/authAdmin.mts";

const dashboardRouter = Router();

dashboardRouter.get("/dashboard-stats", authAdmin, getDashboardStats);
dashboardRouter.get("/users", authAdmin, getAllUsers);
dashboardRouter.post("/update-user", authAdmin, updateUser);

export default dashboardRouter;
