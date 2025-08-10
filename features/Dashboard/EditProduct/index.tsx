"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import useGetCategory from "@/hooks/useGetCategory";
import ImageUploadSection from "@/components/common/images-upload-section";
import useDashboardEditProductFeature from "./hook";

const DashboardEditProductFeature = () => {
  const router = useRouter();
  const {
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
  } = useDashboardEditProductFeature();

  const { data: categories } = useGetCategory();

  return (
    <main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            if (image instanceof File) {
              console.log("📸 Gambar berhasil diganti:", image.name);
            } else {
              console.log("🧾 Gambar tidak diganti, pakai yang lama:", image);
            }
            mutate(data);
          })}
          className="flex justify-between items-start gap-5"
        >
          <div className="p-6 bg-white rounded-3xl border self-start space-y-4">
            <h1 className="flex flex-col gap-2 text-[22px] font-semibold">
              Product Information{" "}
              <span className="text-neutral-300 font-normal text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Necessitatibus, excepturi?
              </span>{" "}
            </h1>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold">
                    Product Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      variant="solid"
                      placeholder="Input product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="variants.0.size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold">Size</FormLabel>
                    <FormControl>
                      <Input
                        variant="solid"
                        placeholder="Input Size"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="variants.0.color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold">Color</FormLabel>
                    <FormControl>
                      <Input variant="solid" placeholder="Color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold">
                      Product Category
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select product category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {!categories?.data?.length ? (
                          <SelectItem disabled value="loading">
                            Loading categories...
                          </SelectItem>
                        ) : (
                          categories.data
                            .filter((cat: any) => !!cat.id)
                            .map((cat: any) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold">Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        variant="solid"
                        placeholder="Input Price"
                        value={field.value}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? "" : Number(value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold">Quantity</FormLabel>
                  <FormControl>
                    <Input
                      variant="solid"
                      placeholder="Input stock"
                      value={field.value}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? "" : Number(value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      variant="solid"
                      placeholder="Input product description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold">
                    Status Product
                  </FormLabel>
                  <Select>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <div>
            <div className="p-6 bg-white rounded-3xl border space-y-4">
              <h1 className="flex flex-col gap-2 text-[22px] font-semibold">
                Image Product{" "}
                <span className="font-normal text-xs">
                  <span className="text-blue-600">Note :</span> Format photos
                  PNG or JPG (Max size 4mb)
                </span>
              </h1>

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUploadSection
                        value={field.value as File}
                        onChange={(value) => {
                          field.onChange(value);
                          setImage(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                type="button"
                className="mt-6 text-blue-600"
                onClick={() => router.back()}
              >
                Discard Changes
              </Button>
              <Button
                variant="accent"
                type="submit"
                disabled={isPending}
                className="mt-6"
              >
                {isPending ? "Saving..." : "Save Product"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default DashboardEditProductFeature;
