import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../utils/apiError";
import { verifyAccessToken } from "../../utils/jwt";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      throw new ApiError(401, "Unauthorized  Access , please login.");

    const token = authHeader.split(" ")[1];

    const payload = verifyAccessToken(token);

    (req as any).user = payload;
    next();
  } catch (err) {
    next(err);
  }
};
