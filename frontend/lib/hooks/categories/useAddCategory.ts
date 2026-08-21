import { addCategoryApi } from "@/lib/api/categoryApi";
import { addCategoryInput } from "@/types/categoryTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddCategory = () => {
  const queryCLient = useQueryClient();

  const { mutate: addCategory, isPending } = useMutation({
    mutationFn: ({ input, file }: { input: addCategoryInput; file: File }) =>
      addCategoryApi(input, file),

    onSuccess: (data) => {
      toast.success(data?.message);
      queryCLient.invalidateQueries({ queryKey: ["categories"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "something went wrong");
    },
  });

  return { addCategory, isPending };
};
