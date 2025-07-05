"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import useAuthStore from "@/hooks/useAuth";
import { useShallow } from "zustand/react/shallow";
import { getCookie, getRole } from "@/lib/utils";
import { Search, Star, ShoppingBag } from "lucide-react";
import ActionUserMenu from "../common/action-user-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [data, getUser, signoutHandler] = useAuthStore(
    useShallow((state) => [state.data, state.getUser, state.signoutHandler])
  );
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isRole, setIsRole] = useState<string>();
  const [searchOpen, setSearchOpen] = useState(false);

  const NAVBAR_SIGNIN = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Products", path: "/products" },
    { name: "Pages", path: "/pages" },
  ];

  const NAVBAR_GUEST = [
    { name: "Home", path: "#header" },
    { name: "Deals", path: "#deals" },
    { name: "New Arrivals", path: "#new-arrivals" },
    { name: "Packages", path: "#packages" },
    { name: "Sign In", path: "/auth/sign-in" },
    { name: "Sign Up", path: "/auth/sign-up" },
  ];

  useEffect(() => {
    const token = getCookie();
    const role = getRole();
    const isGoogle = status === "authenticated";

    setIsLogged(!!token || isGoogle);
    setIsRole(role);
    if (token && !data) getUser();
    setUserData(isGoogle ? session?.user : data);
  }, [pathname, status, getUser, data]);

  return (
    <nav className="container sticky top-0 z-50 bg-white rounded-[10px]">
      <div className="flex justify-between items-center py-2 mt-8">
        <Link href="/" className="shrink-0">
          <span className="text-5xl font-spaceGrotesk font-normal tracking-normal leading-[100%]">
            FASCO
          </span>
        </Link>

        {isLogged ? (
          <div className="flex w-full items-center justify-between">
            <ul className="flex-1 flex items-center justify-center gap-14">
              {NAVBAR_SIGNIN.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-base font-normal tracking-normal leading-[100%]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-6 shrink-0">
              <DropdownMenu open={searchOpen} onOpenChange={setSearchOpen}>
                <DropdownMenuTrigger asChild>
                  <Search className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52" align="end">
                  <Input placeholder="Search..." className="w-full" />
                </DropdownMenuContent>
              </DropdownMenu>

              <ActionUserMenu data={userData} logoutHandler={signoutHandler} />

              <Star
                className="cursor-pointer"
                onClick={() => (window.location.href = "/wishlist")}
              />

              <ShoppingBag
                className="cursor-pointer"
                onClick={() => (window.location.href = "/cart")}
              />
            </div>
          </div>
        ) : (
          <ul className="flex items-center gap-x-14">
            {NAVBAR_GUEST.map((item) => (
              <li key={item.name}>
                {item.name === "Sign Up" ? (
                  <Link href={item.path}>
                    <Button
                      variant="default"
                      className="px-10 py-5 rounded-[10px] shadow-[0px_20px_35px_0px_#00000026]"
                    >
                      {item.name}
                    </Button>
                  </Link>
                ) : (
                  <Link
                    href={item.path}
                    className="text-base font-normal tracking-normal leading-[100%]"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
