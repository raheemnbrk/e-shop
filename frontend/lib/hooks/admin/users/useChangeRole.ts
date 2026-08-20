import { changeRoleApi } from "@/lib/api/admin/usersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useChangeRole = () => {
  const queryClient = useQueryClient();

  const { mutate: changeRole, isPending } = useMutation({
    mutationFn: ({ id, role }: { id: string; role: Role }) =>
      changeRoleApi(id, role),

    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "something went wrong");
    },
  });

  return { changeRole, isPending };
};
