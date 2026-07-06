import api from "./axios";

export const approveSeller = async (id: string): Promise<MessageResponse> => {
  const res = await api.patch(`/admin/approve/${id}`);
  return res.data;
};

export const rejectSeller = async (id: string): Promise<MessageResponse> => {
  const res = await api.patch(`/admin/reject/${id}`);
  return res.data;
};
