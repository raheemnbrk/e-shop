import z from "zod";
import {
  ordersQuerySchema,
  placeOrderSchema,
} from "../validations/orderValidation";

export type placeOrderInput = z.infer<typeof placeOrderSchema>;

export type orderQueryInput = z.infer<typeof ordersQuerySchema>;
