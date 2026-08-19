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
