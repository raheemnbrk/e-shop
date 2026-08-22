import { createProductApi } from "@/lib/api/sellerApi";
import { createProductInput } from "@/types/sellerTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: createProduct, isPending } = useMutation({
    mutationFn: ({
      input,
      files,
    }: {
      input: createProductInput;
      files: File[];
    }) => createProductApi(input, files),

    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["seller-products"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "Something went wrong");
    },
  });

  return { createProduct, isPending };
};
