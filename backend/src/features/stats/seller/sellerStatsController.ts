import { NextFunction, Request, Response } from "express";
import * as sellerStatsServices from "./sellerStatsServices";

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
    } = await sellerStatsServices.sellerDashboardStatsService(sellerId);

    return res.status(200).json({
      success: true,
      stats,
      lowStockProducts,
      recentOrders,
      topSellingProducts,
      topCustomers,
    });
  } catch (err) {
    next(err);
  }
};
