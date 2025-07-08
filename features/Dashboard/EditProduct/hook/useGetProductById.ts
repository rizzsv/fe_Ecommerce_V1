import { axiosInstanceToken } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const useGetProductsById = (id: string) => {
  return useQuery({
    queryKey: ["products-id", id],
    queryFn: async () => {
      const response = await axiosInstanceToken.get(
        `/E-Commerce/api/v1/product/${id}`
      );
      return response.data;
    },
  });
};

export default useGetProductsById;
