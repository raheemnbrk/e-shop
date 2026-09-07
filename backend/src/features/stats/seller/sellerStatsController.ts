import { NextFunction, Request, Response } from "express";
import * as sellerStatsServices from "./sellerStatsServices";
import { dashboardPeriodSchema } from "../../../shared/validations/adminValidation";

export const getSellerDashboardStatsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sellerId = (req as any).seller.id as string;

    const {
      stats,
      lowStockProducts,
      recentOrders,
      topSellingProducts,
      topCustomers,
      ordersByStatus,
    } = await sellerStatsServices.sellerDashboardStatsService(sellerId);

    return res.status(200).json({
      success: true,
      stats,
      lowStockProducts,
      recentOrders,
      topSellingProducts,
      topCustomers,
      ordersByStatus,
    });
  } catch (err) {
    next(err);
  }
};

export const sellerDashboardSalesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sellerId = (req as any).seller.id as string;
    const { period } = dashboardPeriodSchema.parse(req.query);

    const salesChart =
      await sellerStatsServices.sellerDashboardSalesServices(sellerId, {
        period,
      });

    res.status(200).json({
      salesChart,
    });
  } catch (error) {
    next(error);
  }
};
