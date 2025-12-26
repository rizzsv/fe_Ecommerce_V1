"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { axiosInstanceToken } from "@/lib/axios";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import useGetProductsById from "./useGetProductById";
import {
  CreateProductSchema,
  ICreateProductSchema,
} from "../../AddProduct/schema";

const useDashboardEditProductFeature = (slug: string) => {
  const router = useRouter();
  const [image, setImage] = useState<string | File>("");
  const [isImageUpload, setIsImageUpload] = useState<boolean>(false);

  const form = useForm<ICreateProductSchema>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: "",
      image: "",
      stock: 0,
      category: "",
      price: 0,
      description: "",
      // status: "available",
      variants: [{ size: "", color: "", stock: 0 }],
    },
  });

  const { id } = useParams();
  const { data, isLoading } = useGetProductsById(id as string);

  useEffect(() => {
    if (data?.data) {
      const product = data.data;
      form.reset({
        name: product.name,
        image: product.image,
        stock: product.stock,
        category: product.categoryId,
        price: product.price,
        description: product.description,
        variants: product.variants || [{ size: "", color: "", stock: 0 }],
      });
      setImage(product.image);
    }
  }, [data]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ICreateProductSchema) => {
      const response = await axiosInstanceToken.put(
        "/E-Commerce/api/v1/product/update",
        {
          ...data,
          slug: data.name.toLowerCase().replace(/\s/g, "-"),
          image,
        }
      );

      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      form.reset();
      router.push(`/dashboard/product/${slug}`);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const handleImageUpload = () => {
    setIsImageUpload(true);
  };

  return {
    form,
    data,
    isLoading,
    mutate,
    isPending,
    image,
    setImage,
    isImageUpload,
    setIsImageUpload,
    handleImageUpload,
  };
};

export default useDashboardEditProductFeature;
