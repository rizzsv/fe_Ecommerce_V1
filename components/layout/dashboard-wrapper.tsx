"use client";

import {
  PanelLeftClose,
  Home,
  FileText,
  Users,
  TrendingUp,
  Settings,
  CircleQuestionMark,
  LogOut,
  SearchIcon,
  Mail,
  Bell,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import useAuthStore from "@/hooks/useAuth";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useMemo, useState } from "react";
import SidebarProductSubmenu from "../common/sidebar-product-submenu";
import { Input } from "../ui/input";
import DashboardBreadcrumb from "../common/dashboard-breadcrumb";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  const [data, getUser, signoutHandler] = useAuthStore(
    useShallow((state) => [state.data, state.getUser, state.signoutHandler])
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    getUser();
  }, [getUser]);

  const SIDEBAR_GENERAL = [
    {
      title: "Transaction",
      href: "/dashboard/transaction",
      icons: <FileText />,
      count: "(320)",
    },
    {
      title: "Customers",
      href: "/dashboard/customers",
      icons: <Users />,
    },
    {
      title: "Sales Report",
      href: "/dashboard/sales-report",
      icons: <TrendingUp />,
    },
  ];

  const SIDEBAR_TOOLS = [
    {
      title: "Account & Settings",
      href: "/dashboard/account-settings",
      icons: <Settings />,
    },
    {
      title: "Help",
      href: "/dashboard/help",
      icons: <CircleQuestionMark />,
    },
    {
      title: "Sign Out",
      href: "/auth/sign-in",
      icons: <LogOut />,
    },
  ];

  const pageTitle = useMemo(() => {
    if (pathname.startsWith("/dashboard/product")) return "Product";
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/dashboard/account-settings") return "Profile";

    const sidebar = [...SIDEBAR_GENERAL, ...SIDEBAR_TOOLS];
    const match = sidebar.find((item) => item.href === pathname);
    return match?.title || "";
  }, [pathname]);

  return (
    <div className="min-h-screen w-full bg-white text-black">
      <div
        className={`fixed top-0 left-0 h-screen overflow-hidden bg-white transition-all duration-300 z-30 ${
          isSidebarOpen ? "w-[280px]" : "w-[80px]"
        }`}
      >
        <div className="flex h-full max-h-screen flex-col mt-8 px-4">
          <div className="space-y-11">
            <div className="flex justify-between items-center px-2">
              {isSidebarOpen && (
                <Link href="/dashboard">
                  <h1 className="font-spaceGrotesk text-xl font-semibold leading-[130%]">
                    Ecommerce App
                  </h1>
                </Link>
              )}
              <Button
                variant="ghost"
                className="!p-0 h-auto w-auto cursor-w-resize"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <PanelLeftClose className="!w-6 !h-6" />
              </Button>
            </div>

            <div className="space-y-7">
              <div className="rounded-[10px] border flex items-center gap-2 py-2 px-2">
                <div
                  className={`bg-gray-200 rounded-[6px] transition-all duration-300 ${!isSidebarOpen ? "w-[30px] h-[30px]" : "w-10 h-10"}`}
                ></div>
                <div
                  className={`space-y-[2px] ${!isSidebarOpen ? "sr-only" : ""}`}
                >
                  <p className="text-neutral-300 text-xs font-normal">
                    Company
                  </p>
                  <span className="text-sm font-bold leading-[150%]">
                    Fasco Store
                  </span>
                </div>
              </div>

              <nav className="space-y-2">
                {isSidebarOpen ? (
                  <h2 className="text-sm font-normal text-[#727272] px-2">
                    GENERAL
                  </h2>
                ) : (
                  <span className="sr-only">General</span>
                )}
                <Link
                  href="/dashboard"
                  className={`flex items-center ${
                    isSidebarOpen ? "gap-4 justify-start" : "justify-center"
                  } py-2 px-2 rounded-[10px] hover:font-bold hover:text-black hover:bg-blue-100 ${
                    pathname === "/dashboard"
                      ? "bg-blue-100 text-black font-bold"
                      : "text-neutral-400 font-normal"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Home />
                    {isSidebarOpen && (
                      <span className="text-sm">Dashboard</span>
                    )}
                  </div>
                </Link>
                <SidebarProductSubmenu isSidebarOpen={isSidebarOpen} />
                {SIDEBAR_GENERAL.map((item) => (
                  <Link
                    href={item.href}
                    key={item.title}
                    className={`flex items-center ${
                      isSidebarOpen ? "gap-4 justify-start" : "justify-center"
                    } py-2 px-2 rounded-[10px] hover:font-bold hover:text-black hover:bg-blue-100 ${
                      pathname === item.href
                        ? "bg-blue-100 text-black font-bold"
                        : "text-neutral-400 font-normal"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.icons}
                      {isSidebarOpen && (
                        <span className="text-sm">{item.title}</span>
                      )}
                      {isSidebarOpen && item.count && (
                        <span className="text-sm">{item.count}</span>
                      )}
                    </div>
                  </Link>
                ))}
              </nav>

              <nav className="space-y-2.5">
                {isSidebarOpen ? (
                  <h2 className="text-sm font-normal text-[#727272] px-2">
                    TOOLS
                  </h2>
                ) : (
                  <span className="sr-only">Tools</span>
                )}
                {SIDEBAR_TOOLS.map((item) =>
                  item.title === "Sign Out" ? (
                    <button
                      onClick={signoutHandler}
                      key={item.title}
                      className={`w-full flex items-center ${isSidebarOpen ? "gap-4 justify-start" : "justify-center"} py-2 px-2 rounded-[10px] text-neutral-400 font-normal hover:bg-blue-100 hover:text-black hover:font-bold cursor-pointer`}
                    >
                      <div className="flex items-center gap-2">
                        {item.icons}
                        {isSidebarOpen && (
                          <span className="text-sm">{item.title}</span>
                        )}
                      </div>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      key={item.title}
                      className={`flex items-center ${
                        isSidebarOpen ? "gap-4 justify-start" : "justify-center"
                      } py-2 px-2 rounded-[10px] hover:font-bold hover:text-black hover:bg-blue-100 ${
                        pathname === item.href
                          ? "bg-blue-100 text-black font-bold"
                          : "text-neutral-400 font-normal"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {item.icons}
                        {isSidebarOpen && (
                          <span className="text-sm">{item.title}</span>
                        )}
                      </div>
                    </Link>
                  )
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "ml-[280px]" : "ml-[80px]"
        }`}
      >
        <header
          className={`fixed right-0 top-0 z-30 flex items-center justify-between border-b bg-white px-6 py-4 transition-all duration-300 ${
            isSidebarOpen ? "left-[280px]" : "left-[80px]"
          }`}
        >
          <div className="relative w-[300px]">
            <Input
              variant="solid"
              id="search"
              // value={search}
              // onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product"
              className="pl-4 bg-white text-black"
            />
            <span className="absolute inset-y-0 right-4 flex items-center">
              <SearchIcon className="w-4 h-4 text-gray-500" />
            </span>
          </div>

          <div className="flex justify-center items-center gap-4">
            <Button
              size="icon"
              className="bg-neutral-50 text-neutral-800 hover:bg-neutral-100"
            >
              <Mail className="!w-6 !h-6" />
            </Button>
            <Button
              size="icon"
              className="bg-neutral-50 text-neutral-800 hover:bg-neutral-100"
            >
              <Bell className="!w-6 !h-6" />
            </Button>

            <span className="h-9 w-[1px] bg-border" />

            <div className="flex items-center gap-2">
              <div className="w-10 h-9 bg-gray-200 rounded-[6px]"></div>
              <div className="leading-tight">
                <p className="text-base font-bold leading-[1.1]">
                  {data?.data?.username}
                </p>
                <span className="text-neutral-300 text-xs font- leading-[1.1]">
                  Admin
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#F7F7F7] px-8 pt-[102px] pb-8">
          <h1 className="text-2xl font-semibold">{pageTitle}</h1>

          <DashboardBreadcrumb />

          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardWrapper;
