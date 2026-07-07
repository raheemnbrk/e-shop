import { NextFunction, Request, Response } from "express";
import {
  applySellerSchema,
  createProductSchema,
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

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sellerId = (req as any).seller.id as string;
    console.log(req.body);
    const input = createProductSchema.parse({
      ...req.body,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
    });

    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0)
      throw new ApiError(400, "At least one image is required.");

    const { message } = await sellerServices.createProductService(
      sellerId,
      input,
      files,
    );

    return res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};

export const deleteProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };

    const sellerId = (req as any).seller.id;

    const { message } = await sellerServices.deleteProductService(id , sellerId);

    return res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};
