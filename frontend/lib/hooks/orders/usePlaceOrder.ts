import { placeOrderApi } from "@/lib/api/ordersApi";
import { placeOrderInput } from "@/types/orderTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const usePlaceOrder = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: placeOrder, isPending } = useMutation({
    mutationFn: (input: placeOrderInput) => placeOrderApi(input),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      if (data.paymentMethod === "ONLINE" && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      toast.success(data.message ?? "Order placed successfully.");
      router.push(`/my-orders/${data.orderNumber}`);
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "Something went wrong.");
    },
  });

  return { placeOrder, isPending };
};
