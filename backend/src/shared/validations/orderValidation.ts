import z from "zod";
import { DeliveryMethod, PaymentMethod } from "../../generated/prisma";

export const placeOrderSchema = z.object({
  addressId: z.string().min(1, "address is required."),
  couponCode: z.string().optional(),
  deliveryMethod: z.enum(DeliveryMethod),
  paymentMethod: z.enum(PaymentMethod),
  note: z.string().optional(),
});
