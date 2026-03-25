import type { Request, Response } from "express";
import User from "../models/userModels.mts";
import Order from "../models/orderModel.mts";
import Product from "../models/productModel.mts";
import { z } from "zod";

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
    const totalUsers = await User.countDocuments();
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();

    res.json({
      success: true,
      dashboardStats: {
        totalUsers: totalUsers,
        totalCustomers: totalCustomers,
        totalAdmins: totalAdmins,
        totalOrders: totalOrders,
        totalProducts: totalProducts,
      },
    });
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { adminId } = req as any;
    if (!adminId) {
      console.log("Not authorized.");
      res.json({ success: false, message: "Not authorized." });
      return;
    }
    let users;
    const value = (req.query.value as string) || "";
    if (!value || value.trim() === "")
      users = await User.find({}).select("-password");
    else {
      users = await User.find({
        $or: [
          { firstName: { $regex: value, $options: "i" } },
          { lastName: { $regex: value, $options: "i" } },
          { email: { $regex: value, $options: "i" } },
        ],
      }).select("-password");
    }
    res.json({ success: true, users });
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

const updateUserSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .optional(),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .optional(),
  role: z.enum(["admin", "customer"]).optional(),
});

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { adminId } = req as any;
    if (!adminId) {
      console.log("Not authorized.");
      res.json({ success: false, message: "Only admin can access this page." });
      return;
    }
    const { id, ...data } = req.body;
    const parsedData = updateUserSchema.safeParse(data);

    if (!parsedData.success) {
      res.json({
        success: false,
        message: parsedData.error.issues[0].message,
      });
      return;
    }

    const user = await User.findByIdAndUpdate(id, parsedData.data, {
      new: true,
    }).select("-password");
    res.json({ success: true, message: "User modified successfully.", user });
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

export { getDashboardStats, getAllUsers, updateUser };
