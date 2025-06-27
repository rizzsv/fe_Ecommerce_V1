import { useMutation } from "@tanstack/react-query";
import { axiosInstanceToken } from "@/lib/axios";
import { toast } from "sonner";
import { setCookie } from "@/lib/utils";
import type { ISignInSchema } from "../schema";

const useSignIn = () => {
  return useMutation({
    mutationFn: async (values: ISignInSchema) => {
      const response = await axiosInstanceToken.post(
        "/E-Commerce/api/v1/login",
        values
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setCookie(data.data.token);
      window.location.href = "/dashboard";
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

export default useSignIn;
