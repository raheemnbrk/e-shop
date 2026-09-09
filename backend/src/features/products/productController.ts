import { NextFunction, Request, Response } from "express";
import * as productServices from "./productServices";
import {
  createProductSchema,
  updateProductSchema,
} from "../../shared/validations/sellerValidations";
import { ApiError } from "../../shared/utils/apiError";
import {
  createProductInput,
  updateProductInput,
} from "../../shared/types/sellerTypes";
import { productQuery } from "../../shared/types/productTypes";
import { productQuerySchema as customerProductQuerySchema } from "../../shared/validations/productValidations";
import { productQuerySchema } from "../../shared/validations/adminValidation";

export const createProductController = async (
  req: Request<{}, {}, createProductInput>,
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

    const { message } = await productServices.createProductService(
      sellerId,
      input,
      files,
    );

    return res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};

export const getAllProductsController = async (
  req: Request<{}, {}, {}, productQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const input = customerProductQuerySchema.parse((req as any).query);

    const { products, pagination } =
      await productServices.getAllProductsService(input);

    return res.status(200).json({ success: true, products, pagination });
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

    const { message } = await productServices.deleteProductService(
      id,
      sellerId,
    );

    return res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};

export const getSingleProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params as { slug: string };

    const product = await productServices.getSingleProductServices(slug);

    return res.status(200).json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

export const updateProductController = async (
  req: Request<{ id: string }, {}, updateProductInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const sellerId = (req as any).seller.id;

    const input = updateProductSchema.parse({
      ...req.body,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
    });

    const files = req.files as Express.Multer.File[];

    const { message } = await productServices.updateProductServices(
      id,
      sellerId,
      input,
      files,
    );

    return res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};

export const toggleAvailabilityController = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const sellerId = (req as any).seller.id;

    const { message } = await productServices.toggleAvailabilityServices(
      id,
      sellerId,
    );

    return res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};

export const getRelatedProductsController = async (
  req: Request<{ slug: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;

    const relatedProducts =
      await productServices.getRelatedProductsService(slug);

    return res.status(200).json({ success: true, relatedProducts });
  } catch (err) {
    next(err);
  }
};

export const getSellerProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = (req as any).user;

    const input = productQuerySchema.parse((req as any).query);

    const { products, pagination } =
      await productServices.getSellerProductsService(id, input);

    return res.status(200).json({ success: true, products, pagination });
  } catch (err) {
    next(err);
  }
};

export const getAdminProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const input = productQuerySchema.parse((req as any).query);

    const { pagination, products } =
      await productServices.getAdminProductsService(input);

    return res.json({ success: true, products, pagination });
  } catch (err) {
    next(err);
  }
};

export const adminDeleteProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = (req as any).params as { id: string };

    const { message } = await productServices.adminDeleteProductService(id);

    return res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};
