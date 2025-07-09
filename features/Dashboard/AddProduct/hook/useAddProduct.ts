import { useMutation } from "@tanstack/react-query";
import { axiosInstanceToken } from "@/lib/axios";
import { toast } from "sonner";
import type { ICreateProductSchema } from "../schema";
import { useRouter } from "next/navigation";

const useAddProduct = (slug: string) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: ICreateProductSchema) => {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("price", values.price.toString());
      formData.append("stock", values.stock.toString());
      formData.append("category", values.category);
      formData.append("description", values.description);
      formData.append("status", values.status ?? "available");

      if (values.image instanceof File) {
        formData.append("image", values.image);
      }

      formData.append("variants", JSON.stringify(values.variants));

      const response = await axiosInstanceToken.post(
        "/E-Commerce/api/v1/product/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.push(`/dashboard/product/${slug}`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export default useAddProduct;
