import { deleteUserApi } from "@/lib/api/authApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLogout } from "./useLogout";

export const useDeleteUser = () => {
  const { handleLogout } = useLogout();
  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: deleteUserApi,

    onSuccess: (data) => {
      toast.success(data?.message ?? "Account deleted successfully.");

      handleLogout();
    },

    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message ?? "Failed to delete your account.",
      );
    },
  });

  return {
    deleteUser,
    isPending,
  };
};
