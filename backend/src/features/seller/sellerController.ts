import { NextFunction, Request, Response } from "express";
import {
  applySellerSchema,
  sellerCustomersQuerySchema,
  updateOrderStatusSchema,
  updateSellerSchema,
} from "../../shared/validations/sellerValidations";
import { ApiError } from "../../shared/utils/apiError";
import * as sellerServices from "./sellerService";

export const applySellerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id;

    const input = applySellerSchema.parse(req.body);
    const file = req.file;

    if (!file) throw new ApiError(400, "The store logo is required.");

    const { message } = await sellerServices.applySellerService(
      userId,
      input,
      file,
    );

    return res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};

export const updateSellerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sellerId = (req as any).seller.id;

    const input = updateSellerSchema.parse(req.body);
    const file = req.file;

    const seller = await sellerServices.updateSellerServices(
      sellerId,
      input,
      file,
    );

    return res.status(200).json({ success: true, seller });
  } catch (err) {
    next(err);
  }
};

export const getSellerCustomersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sellerId = (req as any).seller.id;
    const input = sellerCustomersQuerySchema.parse((req as any).query);

    const { customers, pagination } =
      await sellerServices.getSellerCustomersServices(sellerId, input);

    return res.json({ success: true, customers, pagination });
  } catch (err) {
    next(err);
  }
};

export const getSellerProfileForAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = (req as any).params as { slug: string };
    const { seller, stats } =
      await sellerServices.getSellerProfileForAdminService(slug);

    return res.status(200).json({ success: true, seller, stats });
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = (req as any).params as { id: string };
    const sellerId = (req as any).seller.id as string;
    const input = updateOrderStatusSchema.parse((req as any).body);

    const { message } = await sellerServices.updateOrderStatusService(
      id,
      sellerId,
      input,
    );

    return res.status(200).json({success : true , message})
  } catch (err) {
    next(err);
  }
};
