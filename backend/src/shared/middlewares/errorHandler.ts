import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError";
import { ReplyError } from "ioredis";
import { ZodError } from "zod";

export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiError) {
    console.log("Api Error : ", err.message);
    return res
      .status(err.status)
      .json({ success: false, message: err.message });
  }
  if (err instanceof ReplyError) {
    console.log("Redis error: ", err.message);
    return res.status(503).json({ success: false, message: err.message });
  }
  if (err instanceof ZodError) {
    console.log(
      "Validation Errors:",
      err.issues.map((issue) => issue.message),
    );
    return res.status(400).json({
      success: false,
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }
  console.log("Error message : ", err.message);
  return res.status(500).json({ success: false, message: err.message });
};
