import { updateProductApi } from "@/lib/api/sellerApi";
import { updateProductInput } from "@/types/sellerTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: updateProduct, isPending } = useMutation({
    mutationFn: ({
      id,
      input,
      files,
    }: {
      id: string;
      input: updateProductInput;
      files: File[];
    }) => updateProductApi(id, input, files),

    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "Something went wrong");
    },
  });

  return { updateProduct, isPending };
};
