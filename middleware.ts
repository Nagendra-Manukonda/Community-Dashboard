import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isTokenExpired = (token: string) => {
  try {
    const payload = token.split('.')[1];
    if (!payload) return true;
    const decoded = JSON.parse(atob(payload));
    return decoded.exp < Date.now() / 1000;
  } catch {
    return true;
  }
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  const isAuthPage = path === "/login" || path === "/signup";
  const isProtectedRoute = path.startsWith("/dashboard");

  if (!token && isProtectedRoute) {
    // Redirect unauthenticated users to login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isAuthPage) {
    // Redirect logged-in users away from login/signup
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (token && isTokenExpired(token)) {
    // Expired token: clear cookie and redirect
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("token");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*"],
};
