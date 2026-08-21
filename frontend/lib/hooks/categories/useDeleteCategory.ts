import { deleteCategoryApi } from "@/lib/api/categoryApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteCategory, isPending } = useMutation({
    mutationFn: (id: string) => deleteCategoryApi(id),

    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "something went wrong");
    },
  });

  return { deleteCategory, isPending };
};
