import { Router } from "express";
import { getAllUsers, getDashboardStats } from "../controllers/dashboard.mts";
import authAdmin from "../middlewares/authAdmin.mts";

const dashboardRouter = Router();

dashboardRouter.get("/dashboard-stats", authAdmin, getDashboardStats);
dashboardRouter.get("/users", authAdmin, getAllUsers);

export default dashboardRouter;
