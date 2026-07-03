import { Router } from "express";
import {
  changePasswordController,
  forgotPasswordController,
  getMeController,
  googleAuthController,
  googleCallbackController,
  loginController,
  logoutController,
  refreshController,
  registerController,
  resendOtpController,
  resetPasswordController,
  updateProfileController,
  verifyOtpController,
  verifyResetPasswordController,
} from "./authControllers";
import {
  forgetPasswordLimiter,
  loginLimiter,
  registerLimiter,
  resendOtpLimiter,
  verifyOtpLimiter,
} from "../../shared/middlewares/authLimiter";
import { authenticate } from "../../shared/middlewares/authenticate";
import { upload } from "../../shared/config/multer";

const authRouter = Router();

authRouter.post("/register", registerLimiter, registerController);
authRouter.post("/login", loginLimiter, loginController);
authRouter.post("/logout", logoutController);
authRouter.post("/refresh", refreshController);
authRouter.post("/verify-otp", verifyOtpLimiter, verifyOtpController);
authRouter.post("/resend", resendOtpLimiter, resendOtpController);
authRouter.get("/google", googleAuthController);
authRouter.get("/google/callback", googleCallbackController);
authRouter.post(
  "/forgot-password",
  forgetPasswordLimiter,
  forgotPasswordController,
);
authRouter.post(
  "/verify-reset-otp",
  verifyOtpLimiter,
  verifyResetPasswordController,
);
authRouter.post("/reset-password", resetPasswordController);
authRouter.post("/change-password", authenticate, changePasswordController);
authRouter.get("/me", authenticate, getMeController);
authRouter.post(
  "/update-profile",
  authenticate,
  upload.single("image"),
  updateProfileController,
);

export default authRouter;
