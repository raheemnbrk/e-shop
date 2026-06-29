import {
  loginSchema,
  registerSchema,
  verifyOtpSchema,
} from "@/lib/validators/auth.schema";
import z from "zod";

export interface User {
  id: string;
  firstName: string;
  LastName: string;
  email: string;
  image: string;
  role: "ADMIN" | "SELLER" | "CUSTOMER";
  phoneNumber?: string | null;
  createdAt: string;
  isVerified: boolean;
}

export interface AuthStore {
  user: User | null;
  accessToken: string | null;
  setAuth: (user: User, accessToken: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setAccessToken: (token: string) => void;
  clearAuth: () => void;
}

export type registerInput = Omit<
  z.infer<typeof registerSchema>,
  "confirmPassword"
>;
export type loginInput = z.infer<typeof loginSchema>;

export type verifyOtpInput = z.infer<typeof verifyOtpSchema>;

export interface authResponse {
  accessToken: string;
  user: User;
}

export interface messageResponse {
  message: string;
}
