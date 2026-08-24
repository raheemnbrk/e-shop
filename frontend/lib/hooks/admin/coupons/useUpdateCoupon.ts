import { updateCouponApi } from "@/lib/api/admin/couponApi";
import { updateCouponInput } from "@/types/couponTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateCoupon = () => {
  const queryClient = useQueryClient();

  const { mutate: updateCoupon, isPending: updating } = useMutation({
    mutationFn: ({ id, input }: { id: string; input: updateCouponInput }) =>
      updateCouponApi(id, input),

    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return { updateCoupon, updating  };
};
