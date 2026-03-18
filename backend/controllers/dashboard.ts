import type { Request, Response } from "express";
import User from "../models/userModels.mjs";
import Order from "../models/orderModel.mts";
import Product from "../models/productModel.mts";

const getDashboardStats = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { adminId } = req as any;
    if (!adminId) {
      res.json({ success: false, message: "Not authorized" });
      return;
    }
    const userCount = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalRevenue = await Order

    res.json({ success: true, userCount, totalOrders, totalProducts });
  } catch (err) {}
};

export { getDashboardStats };
