import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDashboard } from "../../zustand/dashboard";
import { getAllUsers } from "../../api/admin/users";
import toast from "react-hot-toast";

export const useUsersQueries = (value: string) => {
  const setUsers = useDashboard((state) => state.setUsers);

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

  return { getUsers };
};
