"use client";

import { Input } from "@/components/ui/input";
import useDashboardProductDetailsFeature from "./hook";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Download,
  Eye,
  ListFilter,
  Plus,
  SearchIcon,
  Square,
  CheckSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useGetCategory from "@/hooks/useGetCategory";
import { ICategory } from "@/types/category";
import { useParams, usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { IProductSchema } from "./schema";
import { format } from "date-fns";
import ActionDashboardDetail from "@/components/common/action-dashboard-detail";
import { API_URL } from "@/constants/config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTotalStockByCategory } from "@/lib/stock";

const DashboardProductDetailsFeature = ({
  params,
}: {
  params: { slug: string };
}) => {
  const pathname = usePathname();
  const routeParams = useParams();
  const slug = routeParams?.slug;
  const {
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
    handleExportToPDF,
  } = useDashboardProductDetailsFeature(params.slug);

  const { data: dataCategory, isLoading: isLoadingCategory } = useGetCategory();

  const categoryName = dataCategory?.data.find(
    (c: ICategory) => c.slug === slug
  )?.name;

  const filteredProducts = data?.data.filter(
    (product: IProductSchema) => product.categoryName === categoryName
  );

  return (
    <main className="w-full h-full bg-white rounded-3xl border p-6 space-y-6">
      <section className="flex justify-between items-center">
        <div className="relative w-[500px]">
          <Input
            variant="solid"
            id="search"
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for id, name product"
            className="pl-4 bg-white text-black"
          />
          <span className="absolute inset-y-0 right-4 flex items-center">
            <SearchIcon className="w-4 h-4 text-gray-500" />
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outlineOriginal">
            Filter <ListFilter />
          </Button>
          <Button
            variant="outlineOriginal"
            onClick={() => {
              const selectedProducts = filteredProducts?.filter(
                (product: IProductSchema) => selectedItems.includes(product.id)
              );

              if (selectedProducts && selectedProducts.length > 0) {
                handleExportToPDF(selectedProducts, slug as string);
              } else if (filteredProducts && filteredProducts.length > 0) {
                handleExportToPDF(filteredProducts, slug as string);
              }
            }}
          >
            Export <Download />
          </Button>
          <Button
            variant="accent"
            onClick={() =>
              router.push(`/dashboard/product/${slug}/add-product`)
            }
          >
            New Product <Plus />
          </Button>
        </div>
      </section>

      <section className="flex justify-between border rounded-[12px] py-2 px-3">
        {isLoadingCategory ? (
          <>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-[250px] rounded-lg" />
            ))}
          </>
        ) : (
          dataCategory?.data?.map((item: ICategory) => {
            const isActive = pathname.includes(
              `/dashboard/product/${item.slug}`
            );
            return (
              <Link
                key={item.id}
                href={`/dashboard/product/${item.slug}`}
                className={`py-1 w-[250px] text-center text-sm font-bold rounded-lg
            ${isActive ? "bg-blue-100 text-blue-600" : "text-neutral-500 hover:bg-blue-100 hover:text-blue-600"}`}
              >
                {item.name} (
                {getTotalStockByCategory(data?.data || [], item.id)})
              </Link>
            );
          })
        )}
      </section>

      <section>
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50">
              <TableHead>
                <div
                  className="flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    const ids =
                      filteredProducts?.map(
                        (item: IProductSchema) => item.id
                      ) || [];
                    const isAllSelected = ids.every((id: string) =>
                      selectedItems.includes(id)
                    );
                    if (isAllSelected) {
                      resetSelectedItems();
                    } else {
                      ids.forEach((id: string) => {
                        if (!selectedItems.includes(id)) toggleSelectedItem(id);
                      });
                    }
                  }}
                >
                  {(() => {
                    const ids =
                      filteredProducts?.map(
                        (item: IProductSchema) => item.id
                      ) || [];
                    const isAllSelected =
                      ids.length > 0 &&
                      ids.every((id: string) => selectedItems.includes(id));
                    return isAllSelected ? (
                      <CheckSquare className="w-6 h-6 text-blue-600" />
                    ) : (
                      <Square className="w-6 h-6 text-gray-500" />
                    );
                  })()}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  Product <ChevronsUpDown className="w-3 h-5" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  Price <ChevronsUpDown className="w-3 h-5" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  Size <ChevronsUpDown className="w-3 h-5" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  QTY <ChevronsUpDown className="w-3 h-5" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  Date <ChevronsUpDown className="w-3 h-5" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between">
                  Status <ChevronsUpDown className="w-3 h-5" />
                </div>
              </TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border">
            {isLoading ? (
              <>
                {[...Array(8)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(8)].map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-8 w-[100px] rounded-lg" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : (
              filteredProducts?.map((item: IProductSchema) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div
                      className="flex justify-center items-center cursor-pointer"
                      onClick={() => toggleSelectedItem(item.id)}
                    >
                      {selectedItems.includes(item.id) ? (
                        <CheckSquare className="w-6 h-6 text-blue-600" />
                      ) : (
                        <Square className="w-6 h-6 text-gray-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-slate-100 rounded-[10px]">
                      <img
                        src={`${API_URL}/product/${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {item.name}
                  </TableCell>
                  <TableCell>Rp {item.price}</TableCell>
                  <TableCell>
                    {item.variants.map((variant) => variant.size).join(", ")}
                  </TableCell>
                  <TableCell>{item.stock}</TableCell>

                  <TableCell>
                    {format(new Date(item.createdAt), "MM/dd/yy 'at' h:mm a")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "Available" ? "success" : "error"
                      }
                      className="py-1.5 px-2 rounded-[10px]"
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-4">
                    <Button
                      variant="ghost"
                      className="!p-0 h-auto w-auto cursor-pointer"
                      // onClick={() => deleteProduct(item.id)}
                    >
                      <Eye className="!w-6 !h-6" />
                    </Button>
                    <ActionDashboardDetail
                      editHandler={() => {
                        router.push(
                          `/dashboard/product/${slug}/${item.id}/edit`
                        );
                      }}
                      deleteHandler={() => {
                        deleteProduct(item.id);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </section>

      <section className="flex justify-between items-center text-sm font-normal">
        <p>
          <span className="text-blue-600">{(page - 1) * quantity + 1}</span> -{" "}
          <span>
            {Math.min(page * quantity, data?.metaData?.totalItem || 0)}
          </span>{" "}
          of {data?.metaData?.totalItem || 0} Items
        </p>
        <div className="flex space-x-4">
          <div className="flex justify-center items-center gap-2">
            <p>The page on </p>
            <Select
              value={quantity.toString()}
              onValueChange={(value) => {
                setPage(1);
                setQuantity(Number(value));
              }}
            >
              <SelectTrigger className="min-w-[43px] px-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 50].map((qty) => (
                  <SelectItem key={qty} value={qty.toString()}>
                    {qty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-x-2">
            <Button
              variant="outlineOriginal"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outlineOriginal"
              onClick={() =>
                setPage((prev) =>
                  prev < (data?.metaData?.totalPages || 1) ? prev + 1 : prev
                )
              }
              disabled={page === data?.metaData?.totalPages}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardProductDetailsFeature;
