import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboard";
import authAdmin from "../middlewares/authAdmin.mts";

const dashboardRouter = Router()

dashboardRouter.get('/dashboard-stats' , authAdmin , getDashboardStats)

export default dashboardRouter