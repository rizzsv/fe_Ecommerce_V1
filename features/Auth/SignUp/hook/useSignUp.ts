import { useMutation } from "@tanstack/react-query";
import { axiosInstanceToken } from "@/lib/axios";
import { toast } from "sonner";
import type { ISignUpSchema } from "../schema";

const useSignUp = () => {
  return useMutation({
    mutationFn: async (values: ISignUpSchema) => {
      const response = await axiosInstanceToken.post(
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
      let errMsg = "Terjadi kesalahan saat mendaftar";

      if (error?.response?.data?.message) {
        errMsg = error.response.data.message;
      } else if (typeof error?.response?.data === "string") {
        const matches = error.response.data.match(/Error:\s(.+?)<br>/);
        if (matches && matches[1]) {
          errMsg = matches[1];
        }
      }

      toast.error(errMsg);
    },
  });
};

export default useSignUp;
