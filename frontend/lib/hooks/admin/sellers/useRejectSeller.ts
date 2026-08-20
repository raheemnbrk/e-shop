import { rejectSeller } from "@/lib/api/adminApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRejectSeller = () => {
  const queryClient = useQueryClient();

  const { mutate: handleReject, isPending } = useMutation({
    mutationFn: (id: string) => rejectSeller(id),

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["sellers"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return { handleReject, isPending };
};
