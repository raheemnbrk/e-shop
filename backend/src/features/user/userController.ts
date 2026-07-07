import { Request, Response, NextFunction } from "express";
import * as userServices from "./userServices";
import {
  addAddressSchema,
  updateAddressSchema,
  updateProfileSchema,
} from "../../shared/validations/userValidations";

export const getMeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = (req as any).user.id;

    const { user } = await userServices.getMeService(id);

    return res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

export const getAllAddressesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id;

    const addresses = await userServices.getAllAddressesService(userId);

    return res.status(200).json({ success: true, addresses });
  } catch (err) {
    next(err);
  }
};

export const addAddressController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id;
    const input = addAddressSchema.parse(req.body);

    const address = await userServices.addAddressService(userId, input);

    return res.status(200).json({ success: true, address });
  } catch (err) {
    next(err);
  }
};

export const updateProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = (req as any).user.id;
    const input = updateProfileSchema.parse(req.body);
    const file = req.file;

    const result = await userServices.updateProfileService(id, input, file);

    return res.json({ success: true, user: result.user });
  } catch (err) {
    next(err);
  }
};

export const updateAddressController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id;
    const input = updateAddressSchema.parse(req.body);
    const addressId = req.params.id as string;

    const address = await userServices.updateAddressService(
      userId,
      addressId,
      input,
    );

    return res.status(200).json({ success: true, address });
  } catch (err) {
    next(err);
  }
};

export const deleteAddressController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id;
    const addressId = req.params.id as string;

    const { message } = await userServices.deleteAddress(userId, addressId);

    return res.status(200).json({ success: true, message });
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
    const categories = await userServices.getAllCategoriesServices();
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

    const category = await userServices.getCategoryBySlugServices(slug);

    return res.status(200).json({ success: true, category });
  } catch (err) {
    next(err);
  }
};

export const getAllProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("products controller hit")
  try {
    const products = await userServices.getAllProductsService();

    return res.status(200).json({ success: true, products });
  } catch (err) {
    next(err);
  }
};
