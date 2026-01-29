import type { Request, Response } from "express";
import { z } from "zod";
import Order from "../models/orderModel.mts";
import Product from "../models/productModel.mts";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");
const productSchema = z.object({
  productId: objectId,
  quantity: z.number().min(1),
});

const orderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email(),
  productIds: z.array(productSchema).nonempty(),
  userId: objectId,
  totalPrice: z.number().positive(),
  address: z.object({
    country: z.string().min(3, "Invalid country name"),
    state: z.string().min(3, "Invalid state name"),
    city: z.string().min(3, "Invalid city name"),
    street: z.string().min(3, "Invalid street name"),
    zipCode: z.number().positive(),
  }),
  paymentMethod: z.enum(["COD", "ONLINE"]).default("COD"),
});

const placeOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = orderSchema.parse(req.body);

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

export { placeOrder };
