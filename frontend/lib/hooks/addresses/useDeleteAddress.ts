import { deleteAddressApi } from "@/lib/api/addressApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteAddress, isPending } = useMutation({
    mutationFn: (id: string) => deleteAddressApi(id),

    onSuccess: (data) => {
      toast.success(data?.message ?? "Address deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "something went wrong");
    },
  });

  return { deleteAddress, isPending };
};
