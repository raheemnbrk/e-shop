import { placeOrderSchema } from "@/lib/validators/order.schema";
import z from "zod";

export type placeOrderInput = z.infer<typeof placeOrderSchema>;

export interface placeOrderResponse {
  message: String;
  orderId: string;
}
