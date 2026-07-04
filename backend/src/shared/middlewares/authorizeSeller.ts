import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError";
import prisma from "../config/prisma";

export const authorizeSeller = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req as any;
    if (user.role !== "SELLER") throw new ApiError(401, "Access denied.");

    const seller = await prisma.seller.findUnique({
      where: { userId: user.id },
      select: { userId: true, status: true },
    });

    if (!seller) throw new ApiError(404, "Access denied");
    if (seller.status !== "APPROVED") throw new ApiError(403, "Access denied");

    (req as any).seller = { id: seller.userId };
    next();
  } catch (err) {
    next(err);
  }
};
