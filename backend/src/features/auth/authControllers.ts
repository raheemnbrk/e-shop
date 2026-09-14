import { NextFunction, Request, Response } from "express";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  otpSchema,
  registerSchema,
  resendOtpSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from "../../shared/validations/authValidation";
import { REFRESH_TOKEN_EXPIRES_MS } from "../../shared/utils/jwt";
import * as authService from "./authServices";
import {
  changePasswordInput,
  forgotPasswordInput,
  loginInput,
  otpInput,
  registerInput,
  resendOtpInout,
  resetPasswordInput,
  verifyResetOtpInput,
} from "../../shared/types/authTypes";
import { ApiError } from "../../shared/utils/apiError";
import passport from "../../shared/config/passport";

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

    return res.status(201).json({ success: true, message: result.message });
  } catch (err) {
    next(err);
  }
};

export const verifyOtpController = async (
  req: Request<{}, {}, otpInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const input = otpSchema.parse(req.body);
    const result = await authService.verifyOtpService(input);

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

export const resendOtpController = async (
  req: Request<{}, {}, resendOtpInout>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const input = resendOtpSchema.parse((req as any).body);

    const result = await authService.resendOtpService(input);
    return res.status(200).json({ success: true, message: result.message });
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

    if (!result.verified) {
      return res.json({
        success: true,
        verified: false,
        message: "Please verify your email. A new code has been sent.",
      });
    }

    res.cookie("refreshToken", result.refreshToken, cookiesOptions);

    return res.status(200).json({
      success: true,
      verified: true,
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

export const refreshController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken } = (req as any).cookies;
    if (!refreshToken)
      throw new ApiError(401, "Unauthorized access. Please login again.");
    const result = await authService.refreshTokenService(refreshToken);

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

export const googleAuthController = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false,
});

export const googleCallbackController = [
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;

      const { accessToken, refreshToken } =
        await authService.googleAuthService(user);

      res.cookie("refreshToken", refreshToken, cookiesOptions);

      res.redirect(`${process.env.CLIENT_URL!}/callback`);
    } catch (err) {
      next(err);
    }
  },
];

export const forgotPasswordController = async (
  req: Request<{}, {}, forgotPasswordInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const input = forgotPasswordSchema.parse(req.body);

    const { message } = await authService.forgotPasswordService(input);

    return res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};

export const verifyResetPasswordController = async (
  req: Request<{}, {}, verifyResetOtpInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const input = verifyOtpSchema.parse(req.body);

    const { resetToken } =
      await authService.verifyResetPasswordOtpService(input);

    return res.status(200).json({ success: true, resetToken });
  } catch (err) {
    next(err);
  }
};

export const resetPasswordController = async (
  req: Request<{}, {}, resetPasswordInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const input = resetPasswordSchema.parse(req.body);

    const { message } = await authService.resetPasswordService(input);

    return res.json({ success: true, message });
  } catch (err) {
    next(err);
  }
};

export const changePasswordController = async (
  req: Request<{}, {}, changePasswordInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const input = changePasswordSchema.parse(req.body);
    const { id } = (req as any).user;

    const { message } = await authService.changePasswordService(input, id);

    return res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};
