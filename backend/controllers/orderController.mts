import type { Request, Response } from "express";
import { z } from "zod";
import Order from "../models/orderModel.mts";
import Product from "../models/productModel.mts";

type authRequest = Request & {
  userId: string;
};

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");
const productSchema = z.object({
  productId: objectId,
  quantity: z.number().min(1),
});

const orderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email(),
  productIds: z.array(productSchema).nonempty(),
  address: z.object({
    country: z.string().min(3, "Invalid country name"),
    state: z.string().min(3, "Invalid state name"),
    city: z.string().min(3, "Invalid city name"),
    street: z.string().min(3, "Invalid street name"),
    zipCode: z.number().positive(),
  }),
  paymentMethod: z.enum(["COD", "ONLINE"]).default("COD"),
});

const placeOrder = async (req: authRequest, res: Response): Promise<void> => {
  try {
    const data = orderSchema.parse(req.body);
    const { userId } = req as authRequest;
    if (!userId) {
      res.json({ success: false, message: "Not authorized , login first." });
      return;
    }

    const productsFromDb = await Product.find({
      _id: { $in: data.productIds.map((product) => product.productId) },
    });
    if (productsFromDb.length !== data.productIds.length) {
      res.json({
        success: false,
        message: "Can't place an order. there are missing products.",
      });
      return;
    }

    const totalPrice = Number(
      data.productIds
        .reduce((sum, item) => {
          const product = productsFromDb.find((p) =>
            p._id.equals(item.productId),
          );
          if (!product) return sum;
          const price = product.price * (1 - (product.discount || 0) / 100);
          return sum + price * item.quantity;
        }, 0)
        .toFixed(2),
    );

    const order = await Order.create({
      ...data,
      userId,
      status: "pending",
      isPaid: false,
      totalPrice,
    });
    res.json({ success: true, message: "Order placed successfully." });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.json({ success: false, errors: err.issues });
      return;
    }
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

const getALLOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, orders });
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

const getUserOrders = async (
  req: authRequest,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req as authRequest;
    if (!userId) {
      res.json({ success: false, message: "You must login first." });
      return;
    }
    const orders = await Order.find({ userId });
    res.json({ success: true, orders });
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

const cancelOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req as authRequest;
    const { orderId } = req.body;
    if (!orderId) {
      res.json({
        success: false,
        message: "You must provide an id for the order.",
      });
    }
    const order = await Order.findByIdAndUpdate(orderId, {
      status: "cancelled",
    });
    if (!order) {
      res.json({ success: false, message: "order not found." });
      return;
    }
    res.json({ success: true, message: "Order cancelled" });
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

export { placeOrder, getALLOrders, getUserOrders, cancelOrder };
