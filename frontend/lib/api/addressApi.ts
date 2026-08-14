import { addAddressInput, Address } from "@/types/addressType";
import api from "./axios";

export const getAddressApi = async (): Promise<Address> => {
  const res = await api.get("/user/addresses");
  return res.data.addresses;
};

export const addAddressApi = async (
  input: addAddressInput,
): Promise<MessageResponse> => {
  const res = await api.post("/user/add-address", input);
  return res.data;
};

export const deleteAddressApi = async (
  id: string,
): Promise<MessageResponse> => {
  const res = await api.delete(`/user/delete-address/${id}`);
  return res.data;
};
