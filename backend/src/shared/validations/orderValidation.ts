import z from "zod";
import {
  DeliveryMethod,
  OrderStatus,
  PaymentMethod,
} from "../../generated/prisma";
import { searchQuerySchema } from "./adminValidation";

export const placeOrderSchema = z.object({
  addressId: z.string().min(1, "address is required."),
  couponCode: z.string().optional(),
  deliveryMethod: z.enum(DeliveryMethod),
  paymentMethod: z.enum(PaymentMethod),
  note: z.string().optional(),
});

export const ordersQuerySchema = searchQuerySchema.extend({
  status: z.enum(OrderStatus).optional(),
});
