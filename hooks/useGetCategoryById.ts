import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

const useGetProductDetails = (id: string) => {
  return useQuery({
    queryKey: ["product-by-id", id],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/E-Commerce/api/v1/product/${id}`
      );
      return response.data;
    },
  });
};

export default useGetProductDetails;
