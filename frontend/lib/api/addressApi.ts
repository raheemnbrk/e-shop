import {
  addAddressInput,
  Address,
  updateAddressInput,
} from "@/types/addressType";
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

export const updateAddressApi = async (
  id: string,
  input: updateAddressInput,
): Promise<MessageResponse> => {
  const res = await api.patch(`/user/update-address/${id}`, input);
  return res.data;
};

export const setAddressAsDefaultApi = async (
  id: string,
): Promise<MessageResponse> => {
  const res = await api.patch(`/user/address-default/${id}`);
  return res.data;
};
