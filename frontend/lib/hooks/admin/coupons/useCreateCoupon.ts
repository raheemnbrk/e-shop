import { createCouponApi } from "@/lib/api/admin/couponApi";
import { createCouponInput } from "@/types/couponTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateCoupon = () => {
  const queryClient = useQueryClient();

  const { mutate: createCoupon, isPending: creating } = useMutation({
    mutationFn: (input: createCouponInput) => createCouponApi(input),

    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return { createCoupon, creating };
};
