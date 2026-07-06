import { sellerApplicationInput } from "@/types/sellerInput";
import api from "./axios";

export const applySeller = async (input: sellerApplicationInput) => {
  const res = await api.post("/seller/apply", input);
  return res.data;
};
