import { updateCategoryApi } from "@/lib/api/categoryApi";
import { addCategoryInput } from "@/types/categoryTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateCategory =() => {
  const queryClient = useQueryClient();

  const { mutate: updateCategory, isPending } = useMutation({
    mutationFn: ({
      id,
      input,
      file,
    }: {
      id: string;
      input: addCategoryInput;
      file: File;
    }) => updateCategoryApi(id, input, file),

    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "something went wrong");
    },
  });

  return { updateCategory, isPending };
};
