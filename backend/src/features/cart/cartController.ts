import { NextFunction, Request, Response } from "express";
import * as cartServices from "./cartServices";
import { addToCartSchema } from "../../shared/validations/cartValidations";
import { ApiError } from "../../shared/utils/apiError";

export const addToCartController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id;
    const input = addToCartSchema.parse(req.body);

    const { message } = await cartServices.addToCartServices(userId, input);
    return res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};

export const getAllCartItemsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id;
    const cart = await cartServices.getCartService(userId);
    return res.status(200).json({ success: true, cart });
  } catch (err) {
    next(err);
  }
};

export const removeItemFromCartController = async (
  req: Request<{ productId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id;
    const productId = req.params.productId;
    if (!productId) throw new ApiError(400, "You must select an item.");

    const { message } = await cartServices.removeItemFromCartService(
      userId,
      productId,
    );

    return res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};
