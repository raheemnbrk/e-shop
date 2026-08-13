import {
  changePasswordSchema,
  forgetPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  updateProfileSchema,
  verifyOtpSchema,
} from "@/lib/validators/auth.schema";
import z from "zod";

export interface SellerInfo {
  storeName: string;
  storeSlug: string;
  description: string;
  logo: string;
  status: "Pending" | "Approved" | "Rejected";
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  role: "ADMIN" | "SELLER" | "CUSTOMER";
  phoneNumber?: string | null;
  createdAt: string;
  isVerified: boolean;
  seller?: SellerInfo | null;
}

export interface AuthStore {
  user: User | null;
  accessToken: string | null;
  setAuth: (user: User, accessToken: string) => void;
  setUser: (user: User) => void;
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

export type loginResponse =
  | { verified: false; message: string }
  | { verified: true; accessToken: string; user: User };

export type forgetPasswordInput = z.infer<typeof forgetPasswordSchema>;
export type resetPasswordInput = Omit<
  z.infer<typeof resetPasswordSchema>,
  "confirmedPassword"
>;

export type otpType = "register" | "reset" | "login";

export type changePasswordInput = Omit<
  z.infer<typeof changePasswordSchema>,
  "confirmedNewPassword"
>;

export type updateProfileInput = z.infer<typeof updateProfileSchema>;
