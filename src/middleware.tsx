import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const pathname = req.nextUrl.pathname;

  if (accessToken) {
    if (pathname === "/auth/login" || pathname === "/auth/signup") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  } else {
    // these are the protected routes
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/assessment") ||
      pathname.startsWith("/rating")
    ) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/assessment/:path*",
    "/rating/:path*",
    "/auth/login",
    "/auth/signup",
  ],
};
