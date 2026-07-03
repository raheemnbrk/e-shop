import { JwtPayload } from "jsonwebtoken";
import { Role, User } from "../../generated/prisma";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  otpSchema,
  registerSchema,
  resendOtpSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from "../validations/authValidation";
import z from "zod";

export interface Payload extends JwtPayload {
  id: string;
  role: Role;
}

export type registerInput = z.infer<typeof registerSchema>;
export type loginInput = z.infer<typeof loginSchema>;
export type otpInput = z.infer<typeof otpSchema>;
export type resendOtpInout = z.infer<typeof resendOtpSchema>;

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, "password">;
}

export type forgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type verifyResetOtpInput = z.infer<typeof verifyOtpSchema>;
export type resetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type changePasswordInput = z.infer<typeof changePasswordSchema>;


