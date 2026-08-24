import { deleteCouponApi } from "@/lib/api/admin/couponApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCoupon, isPending: deleting } = useMutation({
    mutationFn: (id: string) => deleteCouponApi(id),

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return { deleteCoupon, deleting };
};
