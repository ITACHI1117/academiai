import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
  exp: number;
  [key: string]: any;
}

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const pathname = req.nextUrl.pathname;

  // Allow public routes to pass through
  if (pathname === "/" || pathname.startsWith("/landing")) {
    return NextResponse.next();
  }

  if (accessToken) {
    try {
      const decoded = jwtDecode<JWTPayload>(accessToken);
      
      // Check if token is expired
      if (decoded.exp * 1000 < Date.now()) {
        const response = NextResponse.redirect(new URL("/auth/login", req.url));
        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        return response;
      }

      // Redirect authenticated users away from auth pages
      if (pathname === "/auth/login" || pathname === "/auth/signup") {
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        const isAdmin = role === 'Admin';
        return NextResponse.redirect(new URL(isAdmin ? "/admin/dashboard" : "/dashboard", req.url));
      }

      // Admin routes protection
      if (pathname.startsWith("/admin")) {
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        const isAdmin = role === 'Admin';
        if (!isAdmin) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      }
    } catch (error) {
      // Invalid token, clear cookies and redirect to login
      const response = NextResponse.redirect(new URL("/auth/login", req.url));
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
  } else {
    // No token - protect all authenticated routes
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/assessment") ||
      pathname.startsWith("/rating") ||
      pathname.startsWith("/admin")
    ) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
