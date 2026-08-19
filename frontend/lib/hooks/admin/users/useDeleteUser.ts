import { deleteUserApi } from "@/lib/api/adminApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: (id: string) => deleteUserApi(id),

    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "something went wrong");
    },
  });

  return { deleteUser, isPending };
};
