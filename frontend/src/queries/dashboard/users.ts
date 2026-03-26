import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDashboard } from "../../zustand/dashboard";
import { getAllUsers } from "../../api/admin/users";
import toast from "react-hot-toast";
import { updateUserApi } from "../../api/admin/dashboard";
import { useDashboardQueries } from "./dashboard";

export const useUsersQueries = (value: string) => {
  const setUsers = useDashboard((state) => state.setUsers);
  const { getStats } = useDashboardQueries();

  const getUsers = useQuery({
    queryKey: ["users", value],
    queryFn: () => getAllUsers(value),
  });

  const { data, isSuccess, isError } = getUsers;

  useEffect(() => {
    if (isSuccess && data) {
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data?.message || "Failed to fetch users");
      }
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isError]);

  const updateUser = useMutation({
    mutationFn: ({ id, ...rest }: any) => updateUserApi(id, rest),
    onSuccess: (data) => {
      if (data.success) {
        const users = useDashboard.getState().users;

        setUsers(users.map((u) => (u._id === data.user._id ? data.user : u)));
        getStats.refetch();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
  });

  return { getUsers, updateUser };
};
