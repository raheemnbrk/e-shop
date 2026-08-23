import { deleteProductApi } from "@/lib/api/sellerApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isPending: deleting } = useMutation({
    mutationFn: (id: string) => deleteProductApi(id),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["seller-products"],
      });
      toast.success(data?.message);
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "Something went wrong");
    },
  });

  return { deleteProduct, deleting };
};
