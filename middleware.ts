import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isLogged = request.cookies.get("access_token");

  if (request.nextUrl.pathname.startsWith("/dashboard") && !isLogged) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.nextUrl));
  }

  if (request.nextUrl.pathname === "/auth/sign-in" && isLogged) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}
