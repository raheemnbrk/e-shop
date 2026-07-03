import {
  authResponse,
  forgetPasswordInput,
  loginInput,
  loginResponse,
  messageResponse,
  registerInput,
  resetPasswordInput,
  verifyOtpInput,
} from "@/types/authTypes";
import api from "./axios";

export const register = async (
  input: registerInput,
): Promise<messageResponse> => {
  const res = await api.post("/auth/register", input);
  return res.data;
};

export const login = async (input: loginInput): Promise<loginResponse> => {
  const res = await api.post("/auth/login", input);
  return res.data;
};

export const verifyOtp = async (
  input: verifyOtpInput,
): Promise<authResponse> => {
  const res = await api.post("/auth/verify-otp", input);
  return res.data;
};

export const resendOtp = async (email: string): Promise<messageResponse> => {
  const res = await api.post("/auth/resend", { email });
  return res.data;
};

export const forgetPassword = async (
  input: forgetPasswordInput,
): Promise<messageResponse> => {
  const res = await api.post("/auth/forgot-password", input);
  return res.data;
};

export const verifyResetOtp = async (
  input: verifyOtpInput,
): Promise<string> => {
  const res = await api.post("/auth/verify-reset-otp", input);
  return res.data.resetToken;
};

export const resetPassword = async (
  input: resetPasswordInput,
): Promise<messageResponse> => {
  const res = await api.post("/auth/reset-password", input);
  return res.data;
};
