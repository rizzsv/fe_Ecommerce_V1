import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

const useGetProductDetails = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const response = await axiosInstance.get(`/v1/api/product/${slug}`);
      return response.data;
    },
  });
};

export default useGetProductDetails;
