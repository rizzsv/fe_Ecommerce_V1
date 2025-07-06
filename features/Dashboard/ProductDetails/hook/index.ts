"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { axiosInstanceToken } from "@/lib/axios";
import useGetProductDetails from "./useGetProductDetails";

const useDashboardProductDetailsFeature = (slug: string) => {
  const router = useRouter();

  const { data, isLoading } = useGetProductDetails(slug);

  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstanceToken.delete(
        `/E-Commerce/api/v1/product/${data?.data?.id}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.push(`/dashboard/product/${slug}`);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
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
