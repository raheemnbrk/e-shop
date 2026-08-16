import z from "zod";
import { placeOrderSchema } from "../validations/orderValidation";

export type placeOrderInput = z.infer<typeof placeOrderSchema>;
