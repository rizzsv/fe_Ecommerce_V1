import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isLogged = request.cookies.get("access_token");
  const role = request.cookies.get("access_role");

  if (request.nextUrl.pathname.startsWith("/dashboard") && !isLogged) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.nextUrl));
  }

  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    isLogged &&
    role?.value === "USER"
  ) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (request.nextUrl.pathname === "/auth/sign-in" && isLogged) {
    const redirectUrl = role?.value === "USER" ? "/" : "/dashboard";
    return NextResponse.redirect(new URL(redirectUrl, request.nextUrl));
  }

  return NextResponse.next();
}
