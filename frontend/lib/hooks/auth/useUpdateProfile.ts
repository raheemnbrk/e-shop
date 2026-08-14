import { updateProfileApi } from "@/lib/api/authApi";
import { useAuthStore } from "@/lib/store/authStore";
import { updateProfileInput } from "@/types/authTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: (input: updateProfileInput & { file?: File }) =>
      updateProfileApi(input, input.file),

    onSuccess: (data) => {
      toast.success(data?.message ?? "Profile updated");

      setUser(data.user);

      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "Something went wrong");
    },
  });

  return { updateProfile, isPending };
};
