import { Router } from "express";
import {
  loginController,
  logoutController,
  refreshController,
  registerController,
  resendOtpController,
  verifyOtpController,
} from "./authControllers";
import {
  loginLimiter,
  registerLimiter,
  resendOtpLimiter,
  verifyOtpLimiter,
} from "../../shared/middlewares/authLimiter";

const authRouter = Router();

authRouter.post("/register", registerLimiter, registerController);
authRouter.post("/login", loginLimiter, loginController);
authRouter.post("/logout", logoutController);
authRouter.post("/refresh", refreshController);
authRouter.post("/verify-otp", verifyOtpLimiter, verifyOtpController);
authRouter.post("/resend", resendOtpLimiter, resendOtpController);

export default authRouter;
