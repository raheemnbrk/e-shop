import { NextFunction, Request, Response } from "express";
import * as adminServices from "./adminServices";
import {
  sellerQuerySchema,
  userQuerySchema,
} from "../../shared/validations/adminValidation";
import { ApiError } from "../../shared/utils/apiError";
import { Role } from "../../generated/prisma";

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

export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = (req as any).user;
    const input = userQuerySchema.parse((req as any).query);
    const { users, pagination } = await adminServices.getAllUsersService(
      id,
      input,
    );

    return res.status(200).json({ success: true, users, pagination });
  } catch (err) {
    next(err);
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = (req as any).params as { id: string };

    const { message } = await adminServices.deleteUserService(id);

    return res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};

export const getAllSellersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const input = sellerQuerySchema.parse((req as any).query);

    const { sellers, pagination } =
      await adminServices.getAllSellersService(input);

    return res.status(200).json({ success: true, sellers, pagination });
  } catch (err) {
    next(err);
  }
};

export const changeRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { role } = (req as any).body as { role: Role };
    const { id } = (req as any).params as { id: string };
    if (!id) throw new ApiError(400, "You must select a user.");
    if (!role) throw new ApiError(400, "You must select a role");

    const { message } = await adminServices.changeRoleService(id, role);

    return res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};
