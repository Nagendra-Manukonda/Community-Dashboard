import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isTokenExpired = (token: string) => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded.exp < Date.now() / 1000;
  } catch (e) {
    return true; 
  }
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === "/login";
  const isSignupPage = pathname === "/signup";
  const isDashboard = pathname.startsWith("/dashboard");

  if (token && (isLoginPage || isSignupPage)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!token && isDashboard) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isDashboard && isTokenExpired(token)) {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("token");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*"],
};
