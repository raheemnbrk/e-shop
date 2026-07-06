import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../utils/apiError";

export const authorizeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req as any;

    if (!user || user.role !== "ADMIN")
      throw new ApiError(401, "Access denied.");

    next();
  } catch (err) {
    next(err);
  }
};
