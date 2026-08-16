import z from "zod";

export const placeOrderSchema = z.object({
  addressId: z.string().min(1, "address is required."),
  couponCode: z.string().optional(),
  deliveryMethod: z.enum(["STANDARD", "EXPRESS"]),
  paymentMethod: z.enum(["CASH", "ONLINE"]),
  note: z.string().optional(),
});
