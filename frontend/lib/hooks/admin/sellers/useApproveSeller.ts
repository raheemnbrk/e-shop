import { approveSeller } from "@/lib/api/adminApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useApproveSeller = () => {
  const queryClient = useQueryClient();

  const { mutate: handleApprove, isPending } = useMutation({
    mutationFn: (id: string) => approveSeller(id),

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["sellers"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "something went wrong");
    },
  });

  return { handleApprove, isPending };
};
