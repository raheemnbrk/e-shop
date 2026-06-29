import { JwtPayload } from "jsonwebtoken";
import { Role, User } from "../../generated/prisma";
import {
  loginSchema,
  otpSchema,
  registerSchema,
  resendOtpSchema,
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
