import { applySellerApi } from "@/lib/api/sellerApi";
import { applySellerInput } from "@/types/sellerTypes";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useApplySeller = () => {
  const { mutate: applySeller, isPending } = useMutation({
    mutationFn: (input: applySellerInput & { file: File }) =>
      applySellerApi(input, input.file),

    onSuccess: (data) => {
      toast.success(data?.message ?? "Application submitted successfully");
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "Something went wrong");
    },
  });

  return { applySeller, isPending };
};
