import { NextFunction, Request, Response } from "express";
import { addCategoryInput } from "../../shared/types/categoryTypes";
import { addCategorySchema } from "../../shared/validations/categoryValidation";
import * as categoryServices from "./categoryServices"

export const createCategoryController = async (
  req: Request<{}, {}, addCategoryInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const input = addCategorySchema.parse(req.body);

    const file = req.file as Express.Multer.File;

    const { message } = await categoryServices.addCategoryServices(input, file);

    return res.status(201).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};

export const getCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await categoryServices.getAllCategoriesServices();
    return res.status(200).json({ success: true, categories });
  } catch (err) {
    next(err);
  }
};

export const getCategoryBySlugController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params as { slug: string };

    const category = await categoryServices.getCategoryBySlugServices(slug);

    return res.status(200).json({ success: true, category });
  } catch (err) {
    next(err);
  }
};