import z from "zod";
import { searchQuerySchema } from "./adminSchema";

export const placeOrderSchema = z.object({
  addressId: z.string().min(1, "address is required."),
  couponCode: z.string().optional(),
  deliveryMethod: z.enum(["STANDARD", "EXPRESS"]),
  paymentMethod: z.enum(["CASH", "ONLINE"]),
  note: z.string().optional(),
});

export const myOrdersQuerySchema = searchQuerySchema.extend({
  status: z
    .enum([
      "PENDING",
      "PROCESSING",
      "DELIVERED",
      "CANCELLED",
      "SHIPPED",
      "CONFIRMED",
    ])
    .optional(),
});

export const allOrdersQuerySchema = searchQuerySchema.extend({
  status: z
    .enum([
      "PENDING",
      "PROCESSING",
      "DELIVERED",
      "CANCELLED",
      "SHIPPED",
      "CONFIRMED",
    ])
    .optional(),
  paymentStatus: z.enum(["PAID", "UNPAID"]).optional(),
  paymentMethod: z.enum(["cash", "online"]).optional(),
  sortBy: z.enum(["oldest", "highest", "lowest"]).optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});
