import { changePasswordApi } from "@/lib/api/authApi";
import { changePasswordInput } from "@/types/authTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: (input: changePasswordInput) => changePasswordApi(input),

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "something went wrong");
    },
  });

  return { changePassword, isPending };
};
