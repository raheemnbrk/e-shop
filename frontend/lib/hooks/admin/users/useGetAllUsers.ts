import { getAllUsers } from "@/lib/api/admin/usersApi";
import { userQueryInput } from "@/types/adminTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUsers = ({ role, search, page }: userQueryInput) => {
  return useQuery({
    queryKey: ["users", role, search, page],
    queryFn: () => getAllUsers({ role, search, page }),
  });
};
