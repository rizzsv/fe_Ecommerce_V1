"use client";

import { Input } from "@/components/ui/input";
import useDashboardProductDetailsFeature from "./hook";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Download,
  Eye,
  ListFilter,
  Plus,
  SearchIcon,
  Square,
  SquarePen,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useGetCategory from "@/hooks/useGetCategory";
import { ICategory } from "@/types/category";
import { usePathname } from "next/navigation";
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
import { IProductSchema } from "./hook/schema";
import { dummySneakersProducts } from "@/lib/dummyProduct";
import { format } from "date-fns";
import ActionDashboardDetail from "@/components/common/action-dashboard-detail";

const DashboardProductDetailsFeature = ({
  params,
}: {
  params: { slug: string; id: string };
}) => {
  console.log("params.slug in DashboardProductDetailsFeature:", params.slug);
  console.log("params.id in DashboardProductDetailsFeature:", params.id);
  const { router, data, isLoading, deleteProduct } =
    useDashboardProductDetailsFeature(params.slug);
  const pathname = usePathname();

  const { data: dataCategory, isLoading: isLoadingCategory } = useGetCategory();

  const dummy = dummySneakersProducts;

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
          <Button variant="outlineOriginal">
            Export <Download />
          </Button>
          <Button
            variant="accent"
            onClick={() =>
              router.push(`/dashboard/product/${params.slug}/add-product`)
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
                {item.name}
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
                <div className="flex justify-center items-center">
                  <Square className="w-6 h-6" />
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
              dummy.map((item: IProductSchema) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex justify-center items-center">
                      <Square className="w-6 h-6" />
                    </div>
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-slate-100 rounded-[10px]"></div>
                    {item.name}
                  </TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    {format(new Date(item.createdAt), "MM/dd/yy 'at' h:mm a")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="success"
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
                        router.push(`/dashboard/field/${data?.data.slug}/edit`);
                      }}
                      deleteHandler={() => {
                        deleteProduct(data?.data?.id);
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
          <span className="text-blue-600">1</span> - 10 of 13 Pages
        </p>
        <div className="flex space-x-4">
          <div className="flex justify-center items-center gap-2">
            <p>The page on </p>
            <Button variant="outlineOriginal">
              1 <ChevronDown />
            </Button>
          </div>
          <div className="space-x-2">
            <Button variant="outlineOriginal">
              <ChevronLeft />
            </Button>
            <Button variant="outlineOriginal">
              <ChevronRight />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardProductDetailsFeature;
