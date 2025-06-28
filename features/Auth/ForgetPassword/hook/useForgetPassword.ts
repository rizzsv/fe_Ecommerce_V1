import { useMutation } from "@tanstack/react-query";
import { axiosInstanceToken } from "@/lib/axios";
import { toast } from "sonner";
import type { IForgetPasswordSchema } from "../schema";

const useForgetPassword = () => {
  return useMutation({
    mutationFn: async (values: IForgetPasswordSchema) => {
      const response = await axiosInstanceToken.post(
        "/E-Commerce/api/v1/user/otp",
        values
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      window.location.href = "/auth/confirmation-window";
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

export default useForgetPassword;
