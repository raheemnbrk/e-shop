import { updateSellerApi } from "@/lib/api/sellerApi";
import { useAuthStore } from "@/lib/store/authStore";
import { updateSellerInput } from "@/types/sellerTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateSeller = () => {
  const queryClient = useQueryClient();

  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

  const { mutateAsync: updateSeller, isPending } = useMutation({
    mutationFn: (input: updateSellerInput & { file?: File }) =>
      updateSellerApi(input, input.file),

    onSuccess: (data) => {
      toast.success(data?.message ?? "Seller updated");

      if (data?.seller && user) {
        setUser({
          ...user,
          Seller: data.seller,
        });

        queryClient.setQueryData(["me"], (oldData: any) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            Seller: data.seller,
          };
        });
      }

      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "Something went wrong");
    },
  });

  return {
    updateSeller,
    isPending,
  };
};
