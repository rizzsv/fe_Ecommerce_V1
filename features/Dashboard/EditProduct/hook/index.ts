"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { axiosInstanceToken } from "@/lib/axios";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import useGetProductsById from "./useGetProductById";
import { EditProductSchema, IEditProductSchema } from "../schema";

const useDashboardEditProductFeature = () => {
  const router = useRouter();
  const { id, slug } = useParams();
  const [image, setImage] = useState<string | File>("");
  const [isImageUpload, setIsImageUpload] = useState<boolean>(false);

  const form = useForm<IEditProductSchema>({
    resolver: zodResolver(EditProductSchema),
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

  const { data, isLoading } = useGetProductsById(id as string);

  useEffect(() => {
    if (data?.data) {
      const product = data.data;
      form.reset({
        id: product.id,
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
    mutationFn: async (data: IEditProductSchema) => {
      const formData = new FormData();

      formData.append("id", data.id || "");
      formData.append("name", data.name ?? "");
      formData.append(
        "slug",
        (data.name ?? "").toLowerCase().replace(/\s/g, "-")
      );
      formData.append("price", String(data.price ?? 0));
      formData.append("stock", String(data.stock ?? 0));
      formData.append("description", data.description ?? "");
      formData.append("category", data.category ?? "");

      if (image instanceof File) {
        formData.append("image", image);
      } else {
        formData.append("existingImage", image);
      }

      if (data.variants) {
        data.variants.forEach((variant, index) => {
          formData.append(`variants[${index}][id]`, variant.id || "");
          formData.append(
            `variants[${index}][productId]`,
            variant.productId || ""
          );
          formData.append(`variants[${index}][size]`, variant.size || "");
          formData.append(`variants[${index}][color]`, variant.color || "");
          formData.append(
            `variants[${index}][stock]`,
            String(variant.stock || 0)
          );
        });
      }

      const response = await axiosInstanceToken.put(
        "/E-Commerce/api/v1/product/update",
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
