import { NextFunction, Request, Response } from "express";
import * as adminServices from "./adminServices";
import { addCategoryInput } from "../../shared/types/categoryTypes";
import { addCategorySchema } from "../../shared/validations/categoryValidation";

export const approveSellerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.id as string;

    const { message } = await adminServices.approveSellerServices(userId);

    return res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};

export const rejectSellerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.id as string;

    const { message } = await adminServices.rejectSellerServices(userId);

    return res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};

export const createCategoryController = async (
  req: Request<{}, {}, addCategoryInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const input = addCategorySchema.parse(req.body);

    const file = req.file as Express.Multer.File;

    const { message } = await adminServices.addCategoryServices(input, file);

    return res.status(201).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};
