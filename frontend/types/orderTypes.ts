import { placeOrderSchema } from "@/lib/validators/order.schema";
import z from "zod";

export type placeOrderInput = z.infer<typeof placeOrderSchema>;

export interface placeOrderResponse {
  success: boolean;
  message: string;
  orderId: string;
  paymentMethod: "ONLINE" | "CASH";
  checkoutUrl: string | null;
}
