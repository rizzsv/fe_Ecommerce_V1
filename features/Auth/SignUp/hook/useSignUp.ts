import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import type { ISignUpSchema } from "../schema";

const useSignUp = () => {
  return useMutation({
    mutationFn: async (values: ISignUpSchema) => {
      const response = await axiosInstance.post(
        "/E-Commerce/api/v1/regist",
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

export default useSignUp;
