import { authResponse, loginInput, registerInput } from "@/types/authTypes";
import api from "./axios";

export const register = async (input: registerInput): Promise<authResponse> => {
  const res = await api.post("/auth/register", input);
  return res.data;
};

export const login = async (input: loginInput): Promise<authResponse> => {
  const res = await api.post("/auth/login", input);
  return res.data;
};
