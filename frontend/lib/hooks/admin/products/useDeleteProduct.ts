import { deleteProductApi } from "@/lib/api/admin/productsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isPending: deleting } = useMutation({
    mutationFn: (id: string) => deleteProductApi(id),

    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return { deleteProduct, deleting };
};
