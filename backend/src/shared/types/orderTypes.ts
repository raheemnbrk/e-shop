import z from "zod";
import {
  allOrdersQuerySchema,
  ordersQuerySchema,
  placeOrderSchema,
} from "../validations/orderValidation";

export type placeOrderInput = z.infer<typeof placeOrderSchema>;

export type orderQueryInput = z.infer<typeof ordersQuerySchema>;

export type allOrdersQueryInput = z.infer<typeof allOrdersQuerySchema>;
