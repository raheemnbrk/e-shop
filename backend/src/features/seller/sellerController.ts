import { NextFunction, Request, Response } from "express";
import { applySellerSchema } from "../../shared/validations/sellerValidations";
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
