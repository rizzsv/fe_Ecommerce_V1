import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCookie = () => Cookies.get("access_token");
export const setCookie = (value: string) => Cookies.set("access_token", value);
export const removeCookie = () => Cookies.remove("access_token");

export const getRole = () => Cookies.get("acces_role");
export const setRole = (role: "ADMIN" | "USER") =>
  Cookies.set("acces_role", role);
export const removeRole = () => Cookies.remove("acces_role");
