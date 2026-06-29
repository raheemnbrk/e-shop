import {
  authResponse,
  loginInput,
  messageResponse,
  registerInput,
  verifyOtpInput,
} from "@/types/authTypes";
import api from "./axios";

export const register = async (input: registerInput): Promise<messageResponse> => {
  const res = await api.post("/auth/register", input);
  return res.data;
};

export const login = async (input: loginInput): Promise<authResponse> => {
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
  const res = await api.post("/auth/resend", email);
  return res.data;
};
