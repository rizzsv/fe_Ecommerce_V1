"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const DashboardBreadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const isLast = index === pathSegments.length - 1;

    const isProductWithSubpage =
      segment === "product" && pathSegments.length > index + 1;

    return (
      <div key={href} className="flex items-center gap-1">
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage>{capitalize(segment)}</BreadcrumbPage>
          ) : isProductWithSubpage ? (
            <BreadcrumbLink asChild>
              <Link href={pathname}>{capitalize(segment)}</Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink asChild>
              <Link href={href}>{capitalize(segment)}</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator />}
      </div>
    );
  });

  return (
    <Breadcrumb className="pt-2 pb-[22px]">
      <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
    </Breadcrumb>
  );
};

const labelMap: Record<string, string> = {
  "sales-report": "Sales Report",
  "t-shirt": "T-Shirt",
  "account-settings": "Profile",
};

function capitalize(word: string) {
  return labelMap[word] || word.charAt(0).toUpperCase() + word.slice(1);
}

export default DashboardBreadcrumb;
