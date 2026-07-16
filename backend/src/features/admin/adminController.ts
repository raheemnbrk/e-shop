import { NextFunction, Request, Response } from "express";
import * as adminServices from "./adminServices";
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
    const role = req.body as Role | undefined;
    const users = await adminServices.getAllUsersService(id, role);

    return res.status(200).json({ success: true, users });
  } catch (err) {
    next(err);
  }
};
