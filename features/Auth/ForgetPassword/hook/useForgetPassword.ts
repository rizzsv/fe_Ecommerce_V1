import { useMutation } from "@tanstack/react-query";
import { axiosInstanceToken } from "@/lib/axios";
import { toast } from "sonner";
import { setCookie } from "@/lib/utils";
import type { IForgetPasswordSchema } from "../schema";

const useForgetPassword = () => {
  return useMutation({
    mutationFn: async (values: IForgetPasswordSchema) => {
      const response = await axiosInstanceToken.post(
        "/E-Commerce/api/v1/forget-password",
        values
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setCookie(data.data.token);
      window.location.href = "/auth/confirmation-window";
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

export default useForgetPassword;
