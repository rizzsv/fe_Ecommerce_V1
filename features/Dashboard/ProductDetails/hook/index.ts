"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { axiosInstanceToken } from "@/lib/axios";
import useGetProducts from "./useGetProduct";
import { useState } from "react";
import useProductFilter from "./useProductFilter";
import useProductExport from "./useProductExport";

const useDashboardProductDetailsFeature = (
  slug: string,
  initialPeriode: string = new Date().getFullYear().toString()
) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [periode, setPeriode] = useState(initialPeriode);
  const [page, setPage] = useState(1);
  const [quantity, setQuantity] = useState(10);

  const {
    selectedItems,
    toggleSelectedItem,
    resetSelectedItems,
    selectAll,
    isSelected,
  } = useProductFilter();

  const { handleExportToPDF } = useProductExport();

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
      resetSelectedItems();
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
    page,
    setPage,
    quantity,
    setQuantity,
    periode,
    setPeriode,
    selectedItems,
    toggleSelectedItem,
    resetSelectedItems,
    selectAll,
    isSelected,
    handleExportToPDF,
  };
};

export default useDashboardProductDetailsFeature;
