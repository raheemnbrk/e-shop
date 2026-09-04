import { cancelOrderApi } from "@/lib/api/ordersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  const { mutate: cancelOrder, isPending: cancelling } = useMutation({
    mutationFn: (id: string) => cancelOrderApi(id),

    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "Something went wrong.");
    },
  });

  return { cancelOrder, cancelling };
};
