import { useMutation } from "@tanstack/react-query";
import { axiosInstanceToken } from "@/lib/axios";
import { toast } from "sonner";
import { setCookie } from "@/lib/utils";
import type { IConfirmCodeSchema } from "../schema";

const useConfirmCode = () => {
  return useMutation({
    mutationFn: async (values: IConfirmCodeSchema) => {
      const response = await axiosInstanceToken.post(
        "/E-Commerce/api/v1/confirm-code",
        values
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setCookie(data.data.token);
      window.location.href = "/auth/new-password";
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

export default useConfirmCode;
