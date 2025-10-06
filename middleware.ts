// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const loginPage = req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup";
  const dashboardPage = req.nextUrl.pathname.startsWith("/dashboard");

  if (token && loginPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!token && dashboardPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*"], 
};
