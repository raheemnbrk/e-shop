import { allUserResponse, userQueryInput } from "@/types/adminTypes";
import api from "../axios";

export const getAllUsers = async ({
  role,
  page,
  search,
}: userQueryInput): Promise<allUserResponse> => {
  const res = await api.get("/admin/users", {
    params: { role, page, search },
  });
  return res.data;
};

export const deleteUserApi = async (id: string): Promise<MessageResponse> => {
  const res = await api.delete(`/admin/users/delete/${id}`);
  return res.data;
};

export const changeRoleApi = async (
  id: string,
  role: Role,
): Promise<MessageResponse> => {
  const res = await api.patch(`/admin/users/change-role/${id}`, { role });
  return res.data;
};
