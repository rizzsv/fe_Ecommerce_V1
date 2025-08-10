import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Store } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useDashboardProductDetailsFeature from "@/features/Dashboard/ProductDetails/hook";
import { getTotalStock } from "@/lib/stock";
import { Product } from "@/types/product";

const SidebarProductSubmenu = ({
  isSidebarOpen,
}: {
  isSidebarOpen: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = pathname.startsWith("/dashboard/product");

  useEffect(() => {
    if (isActive) setOpen(true);
  }, [isActive]);

  const { data, isLoading } = useDashboardProductDetailsFeature("all");

  const products: Product[] = data?.data ?? [];
  const totalStock = getTotalStock(products);

  const SUBMENU_ITEM = [
    { label: "Sneakers", slug: "sneakers" },
    { label: "Jacket", slug: "jacket" },
    { label: "T-Shirt", slug: "t-shirt" },
    { label: "Bag", slug: "bag" },
  ];

  return (
    <div className="space-y-1">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center ${
          isSidebarOpen ? "justify-between gap-4" : "justify-center"
        } py-2 px-2 rounded-[10px] hover:bg-blue-100 hover:text-black hover:font-bold cursor-pointer
          ${isActive ? "bg-blue-100 text-black font-bold" : "text-neutral-400 font-normal"}
        `}
      >
        <div className="flex items-center gap-2">
          <Store className="w-6 h-6" />
          {isSidebarOpen && (
            <span className="text-sm">
              Product ({isLoading ? "..." : totalStock})
            </span>
          )}
        </div>
        {isSidebarOpen &&
          (open ? (
            <ChevronUp className="w-6 h-6" />
          ) : (
            <ChevronDown className="w-6 h-6" />
          ))}
      </button>

      {open && isSidebarOpen && (
        <ul className="ml-[18px] border-l-2 space-y-2 text-sm">
          {SUBMENU_ITEM.map((item) => {
            const isSubmenuItemActive = pathname.startsWith(
              `/dashboard/product/${item.slug}`
            );

            return (
              <li
                key={item.slug}
                className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-2 before:h-px before:bg-neutral-300"
              >
                <Link
                  href={`/dashboard/product/${item.slug}`}
                  className={`block pl-1 hover:text-blue-600 hover:font-bold ${
                    isSubmenuItemActive
                      ? "text-blue-600 font-bold"
                      : "text-neutral-400 font-normal"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SidebarProductSubmenu;
