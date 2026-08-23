import { toggleProductAvailabilityApi } from "@/lib/api/sellerApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useToggleProductAvailability = () => {
  const queryClient = useQueryClient();

  const { mutate: toggleProductAvailability, isPending: toggling } =
    useMutation({
      mutationFn: (id: string) => toggleProductAvailabilityApi(id),

      onSuccess: (data) => {
        toast.success(data?.message);
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
      },

      onError: (err: any) => {
        toast.error(err?.response?.data?.message ?? "Something went wrong");
      },
    });

  return { toggleProductAvailability, toggling };
};
