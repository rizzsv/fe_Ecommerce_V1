import { axiosInstanceToken } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const useGetProducts = (periode: string, page: number, quantity: number) => {
  return useQuery({
    queryKey: ["products", periode, page, quantity],
    queryFn: async () => {
      const response = await axiosInstanceToken.get(
        `/E-Commerce/api/v1/product?periode=${periode}&page=${page}&quantity=${quantity}`
      );
      return response.data;
    },
  });
};

export default useGetProducts;
