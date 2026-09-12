import { updateOrderStatusApi } from "@/lib/api/admin/ordersApi";
import { updateOrderStatusInput } from "@/types/adminTypes";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  const { mutate: updateStatus, isPending: updating } = useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: updateOrderStatusInput;
    }) => updateOrderStatusApi(id, input),

    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "Something went wrong.");
    },
  });

  return { updateStatus, updating };
};
