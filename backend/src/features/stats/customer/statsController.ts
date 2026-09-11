import { NextFunction, Request, Response } from "express";
import { getCustomerStatsService } from "./statsService";

export const getCustomerStatsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = (req as any).user.id as string;

  const stats = await getCustomerStatsService(userId);

  return res.status(200).json({ success: true, result: stats });
};
