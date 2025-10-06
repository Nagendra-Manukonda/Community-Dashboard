import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isTokenExpired = (token: string) => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded.exp < Date.now() / 800;
  } catch (e) {
    return true;
  }
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const loginPage = req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup";
  const dashboardPage = req.nextUrl.pathname.startsWith("/dashboard");

  if (token) {
    if (loginPage) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (isTokenExpired(token)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (!token && dashboardPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*"],
};
