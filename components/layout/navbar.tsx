"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const NAVBAR_ITEMS = [
    { name: "Home", path: "/" },
    { name: "Deals", path: "/deals" },
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Packages", path: "/packages" },
    { name: "Sign In", path: "/auth/sign-in" },
    { name: "Sign Up", path: "/auth/sign-up" },
  ];

  return (
    <nav className="container">
      <div className="flex justify-between items-center">
        <Link href="/">
          <span className="text-5xl font-spaceGrotesk font-normal tracking-normal leading-[100%]">
            FASCO
          </span>
        </Link>

        <ul className="flex space-x-14 py-16">
          {NAVBAR_ITEMS.map((item) => (
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
      </div>
    </nav>
  );
};

export default Navbar;
