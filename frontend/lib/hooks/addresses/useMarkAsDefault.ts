import { setAddressAsDefaultApi } from "@/lib/api/addressApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMarkAsDefault = () => {
  const queryClient = useQueryClient();

  const { mutate: markAsDefault, isPending } = useMutation({
    mutationFn: (id: string) => setAddressAsDefaultApi(id),

    onSuccess: (data) => {
      toast.success(data?.message ?? "Address marked as default.");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "something went wrong");
    },
  });

  return { markAsDefault, isPending };
};
