import { NextFunction, Request, Response } from "express";
import {
  couponQuerySchema,
  createCouponSchema,
  updateCouponSchema,
} from "../../shared/validations/couponValidation";
import * as couponServices from "./couponServices";

export const createCouponController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const input = createCouponSchema.parse(req.body);

    const { message } = await couponServices.createCouponService(input);

    return res.status(201).json({
      success: true,
      message,
    });
  } catch (err) {
    next(err);
  }
};

export const updateCouponController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = (req as any).params as { id: string };

    const input = updateCouponSchema.parse((req as any).query);

    const { message } = await couponServices.updateCouponService(id, input);

    return res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};

export const toggleCouponController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = (req as any).params as { id: string };

  const { message } = await couponServices.toggleCouponService(id);

  return res.status(200).json({ success: true, message });
};

export const getAllCouponsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const input = couponQuerySchema.parse((req as any).query);

    const { coupons, pagination } =
      await couponServices.getALlCouponsService(input);

    return res.status(200).json({ success: true, coupons, pagination });
  } catch (err) {
    next(err);
  }
};
