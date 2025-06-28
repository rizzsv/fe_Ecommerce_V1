import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

const useResendCode = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await axiosInstance.post("/E-Commerce/api/v1/user/otp", {
        email,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Kode verifikasi telah dikirim ulang ke email kamu.");
    },
    onError: () => {
      toast.error("Gagal mengirim ulang kode. Coba lagi.");
    },
  });
};

export default useResendCode;
