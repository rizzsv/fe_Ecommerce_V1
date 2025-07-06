import { useQuery } from "@tanstack/react-query";
import { axiosInstanceToken } from "@/lib/axios";

const useGetCategory = (
  periode: number = new Date().getFullYear(),
  page: number = 1,
  quantity: number = 5
) => {
  return useQuery({
    queryKey: ["category", periode, page, quantity],
    queryFn: async () => {
      const response = await axiosInstanceToken.get(
        "/E-Commerce/api/v1/category",
        {
          params: {
            periode,
            page,
            quantity,
          },
        }
      );
      return response.data;
    },
  });
};

export default useGetCategory;
