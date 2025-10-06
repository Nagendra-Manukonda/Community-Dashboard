import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isTokenExpired = (token: string) => {
  try {
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return true;
    const decoded = JSON.parse(atob(payloadBase64));
    return decoded.exp < Date.now() / 1000;
  } catch (err) {
    console.error("Token decode error:", err);
    return true;
  }
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isLoginPath = pathname === "/login";
  const isSignupPath = pathname === "/signup";
  const wantsDashboard = pathname.startsWith("/dashboard");

  try {
    if (token) {
      if (isLoginPath || isSignupPath) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      if (wantsDashboard && isTokenExpired(token)) {
        const res = NextResponse.redirect(new URL("/login", req.url));
        res.cookies.delete("token");
        return res;
      }
      return NextResponse.next();
    } else {
      if (wantsDashboard) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      return NextResponse.next();
    }
  } catch (err) {
    console.error("Middleware error:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*"],
};
