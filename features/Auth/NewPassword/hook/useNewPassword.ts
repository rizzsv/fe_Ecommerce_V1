import { useMutation } from "@tanstack/react-query";
import { axiosInstanceToken } from "@/lib/axios";
import { toast } from "sonner";
import type { INewPasswordSchema } from "../schema";

const useNewPassword = () => {
  return useMutation({
    mutationFn: async (values: INewPasswordSchema) => {
      const response = await axiosInstanceToken.post(
        "/E-Commerce/api/v1/new-password",
        values
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      window.location.href = "/auth/sign-in";
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

export default useNewPassword;
