import { NextFunction, Request, Response } from "express";
import * as adminStatsServices from "./statsServices";

export const adminDashboardStatsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      stats,
      recentOrders,
      lowStockProducts,
      topSellingProducts,
      topCustomers,
    } = await adminStatsServices.adminDashboardStatsServices();

    return res.status(200).json({
      success: true,
      stats,
      recentOrders,
      lowStockProducts,
      topSellingProducts,
      topCustomers,
    });
  } catch (err) {
    next(err);
  }
};
