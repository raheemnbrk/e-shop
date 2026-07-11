import { addReviewApi } from "@/lib/api/productApi";
import { addReviewInput } from "@/types/productTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddReview = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();

  const { mutate: handleAddReview, isPending } = useMutation({
    mutationFn: ({
      productId,
      input,
    }: {
      productId: string;
      input: addReviewInput;
    }) => addReviewApi(productId, input),

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["product"] });
      onSuccess?.();
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "something went wrong");
    },
  });

  return { handleAddReview, isPending };
};
