import { toggleCouponApi } from "@/lib/api/admin/couponApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useToggleCoupon = () => {
  const queryClient = useQueryClient();
  const { mutate: toggleCoupon, isPending: toggling } = useMutation({
    mutationFn: (id: string) => toggleCouponApi(id),

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return { toggleCoupon, toggling };
};
