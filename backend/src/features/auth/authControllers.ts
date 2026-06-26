import { NextFunction, Request, Response } from "express";
import {
  loginSchema,
  registerSchema,
} from "../../shared/validations/authValidation";
import { REFRESH_TOKEN_EXPIRES_MS } from "../../shared/utils/jwt";
import * as authService from "./authServices";
import { loginInput, registerInput } from "../../shared/types/authTypes";

const isProd = process.env.NODE_ENV === "production";

const cookiesOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? ("none" as const) : ("lax" as const),
  maxAge: REFRESH_TOKEN_EXPIRES_MS,
};

export const registerController = async (
  req: Request<{}, {}, registerInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const input = registerSchema.parse(req.body);

    const result = await authService.registerService(input);

    res.cookie("refreshToken", result.refreshToken, cookiesOptions);

    return res.status(201).json({
      success: true,
      accessToken: result.accessToken,
      user: result.user,
    });
  } catch (err) {
    next(err);
  }
};

export const loginController = async (
  req: Request<{}, {}, loginInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const input = loginSchema.parse(req.body);

    const result = await authService.loginService(input);

    res.cookie("refreshToken", result.refreshToken, cookiesOptions);

    return res.status(200).json({
      success: true,
      accessToken: result.accessToken,
      user: result.user,
    });
  } catch (err) {
    next(err);
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken } = (req as any).cookies;
    await authService.logoutService(refreshToken);

    res.clearCookie("refreshToken", {
      httpOnly: cookiesOptions.httpOnly,
      secure: cookiesOptions.secure,
      sameSite: cookiesOptions.sameSite,
    });

    res
      .status(200)
      .json({ success: true, message: "Logged out successfully." });
  } catch (err) {
    next(err);
  }
};
