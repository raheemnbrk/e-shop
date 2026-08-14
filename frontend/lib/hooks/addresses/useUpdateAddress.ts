import { updateAddressApi } from "@/lib/api/addressApi";
import { updateAddressInput } from "@/types/addressType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  const { mutate: updateAddress, isPending } = useMutation({
    mutationFn: ({ id, input }: { id: string; input: updateAddressInput }) =>
      updateAddressApi(id, input),

    onSuccess: (data) => {
      toast.success(data?.message ?? "Address updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "something went wrong");
    },
  });

  return { updateAddress, isPending };
};
