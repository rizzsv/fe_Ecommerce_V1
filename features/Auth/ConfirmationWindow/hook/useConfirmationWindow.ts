import { useMutation } from "@tanstack/react-query";
import { axiosInstanceToken } from "@/lib/axios";
import { toast } from "sonner";
import type { IConfirmCodeSchema } from "../schema";

const useConfirmCode = () => {
  return useMutation({
    mutationFn: async (values: IConfirmCodeSchema) => {
      const response = await axiosInstanceToken.post(
        "/E-Commerce/api/v1/user/otp/confirm",
        values
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      window.location.href = "/auth/new-password";
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        (typeof error?.response?.data === "string"
          ? "Server error: " + error.response.data.slice(0, 100) // crop HTML
          : "Terjadi kesalahan");

      toast.error(message);
    },
  });
};

export default useConfirmCode;
