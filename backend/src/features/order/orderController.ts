import { NextFunction, Request, Response } from "express";
import { placeOrderInput } from "../../shared/types/orderTypes";
import { placeOrderSchema } from "../../shared/validations/orderValidation";
import * as orderServices from "./orderServices";

export const placeOrderController = async (
  req: Request<{ id: string }, {}, placeOrderInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id;

    const input = placeOrderSchema.parse(req.body);

    const { message, orderId } = await orderServices.placeOrderService(
      userId,
      input,
    );

    return res.status(201).json({ success: true, message, orderId });
  } catch (err) {
    next(err);
  }
};
