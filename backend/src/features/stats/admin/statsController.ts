import { NextFunction, Request, Response } from "express";
import * as adminStatsServices from "./statsServices";
import { dashboardPeriodSchema } from "../../../shared/validations/adminValidation";

export const adminDashboardStatsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const period = dashboardPeriodSchema.parse((req as any).query);

    const {
      stats,
      recentOrders,
      lowStockProducts,
      topSellingProducts,
      topCustomers,
      ordersByStatus,
    } = await adminStatsServices.adminDashboardStatsServices(period);

    return res.status(200).json({
      success: true,
      stats,
      recentOrders,
      lowStockProducts,
      topSellingProducts,
      topCustomers,
      ordersByStatus,
    });
  } catch (err) {
    next(err);
  }
};

export const adminDashboardSalesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { period } = dashboardPeriodSchema.parse(req.query);

    const salesChart = await adminStatsServices.adminDashboardSalesServices({
      period,
    });

    res.status(200).json({
      salesChart,
    });
  } catch (error) {
    next(error);
  }
};
