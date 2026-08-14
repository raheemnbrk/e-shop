import { addAddressApi } from "@/lib/api/addressApi";
import { addAddressInput } from "@/types/addressType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddAddress = () => {
  const queryClient = useQueryClient();

  const { mutate: addAddress, isPending } = useMutation({
    mutationFn: (input: addAddressInput) => addAddressApi(input),

    onSuccess: (data) => {
      toast.success(data?.message ?? "Address added successfully.");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "something went wrong");
    },
  });

  return { addAddress, isPending };
};
