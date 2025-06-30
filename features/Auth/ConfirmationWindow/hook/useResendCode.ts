import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

interface ReqOTPPayload {
  email: string;
  username: string;
  phoneNum: string;
}

const useResendCode = () => {
  return useMutation({
    mutationFn: async (payload: ReqOTPPayload) => {
      const response = await axiosInstance.post(
        "/E-Commerce/api/v1/user/otp",
        payload
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
};

export default useResendCode;
