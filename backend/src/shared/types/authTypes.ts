import { JwtPayload } from "jsonwebtoken";
import { Role, User } from "../../generated/prisma";
import { loginSchema, registerSchema } from "../validations/authValidation";
import z from "zod";

export interface Payload extends JwtPayload {
  id: string;
  role: Role;
}

export type registerInput = z.infer<typeof registerSchema>;
export type loginInput = z.infer<typeof loginSchema>;

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, "password">;
}
