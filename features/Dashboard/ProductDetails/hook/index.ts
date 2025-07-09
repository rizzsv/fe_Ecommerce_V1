"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { axiosInstanceToken } from "@/lib/axios";
import useGetProducts from "./useGetProduct";

const useDashboardProductDetailsFeature = (
  slug: string,
  periode: string = new Date().getFullYear().toString(),
  page: number = 1,
  quantity: number = 5
) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetProducts(periode, page, quantity);

  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstanceToken.delete(
        `/E-Commerce/api/v1/product/${id}`
      );
      return response.data;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Product deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: ["products", periode, page, quantity],
      });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete product."
      );
    },
  });

  return {
    router,
    data,
    isLoading,
    deleteProduct,
  };
};

export default useDashboardProductDetailsFeature;
