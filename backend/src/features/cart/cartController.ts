import { NextFunction, Request, Response } from "express";
import * as cartServices from "./cartServices";
import { addToCartSchema } from "../../shared/validations/cartValidations";
import { ApiError } from "../../shared/utils/apiError";
import z from "zod";

export const addToCartController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id;
    // coerce quantity to number in case client sent it as a string
    if (req.body && typeof req.body.quantity !== "number") {
      req.body.quantity = Number(req.body.quantity);
    }
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

export const clearCartController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id;

    const { message } = await cartServices.clearCartService(userId);

    return res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};

export const updateCartController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id as string;
    if (req.body && typeof req.body.quantity !== "number") {
      req.body.quantity = Number(req.body.quantity);
    }
    const input = addToCartSchema.parse(req.body);

    const message = await cartServices.updateCartService(userId, input);

    return res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};

export const mergeCartController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id;

    const mergeCartSchema = z.object({
      items: z.array(addToCartSchema),
    });

    if (req.body && Array.isArray(req.body.items)) {
      req.body.items = req.body.items.map((it: any) => ({
        ...it,
        quantity: Number(it.quantity),
      }));
      // remove invalid items (non-numeric, zero or negative quantities)
      req.body.items = req.body.items.filter(
        (it: any) => Number.isFinite(it.quantity) && it.quantity >= 1,
      );
    }

    const { items } = mergeCartSchema.parse(req.body);
    const { message } = await cartServices.mergeCartService(userId, items);
    res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};
