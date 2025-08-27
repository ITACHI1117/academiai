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

  // Allow public routes and auth pages to pass through
  if (pathname === "/" || pathname.startsWith("/landing") || pathname.startsWith("/auth")) {
    // If user has valid token and tries to access auth pages, redirect them
    if (accessToken && (pathname === "/auth/login" || pathname === "/auth/signup")) {
      try {
        const decoded = jwtDecode<JWTPayload>(accessToken);
        
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          // Token expired, clear cookies and allow access to auth page
          const response = NextResponse.next();
          response.cookies.delete("accessToken");
          response.cookies.delete("refreshToken");
          return response;
        }

        // Valid token, redirect away from auth pages
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        const isAdmin = role === 'Admin';
        return NextResponse.redirect(new URL(isAdmin ? "/admin/dashboard" : "/dashboard", req.url));
      } catch (error) {
        // Invalid token, clear cookies and allow access to auth page
        const response = NextResponse.next();
        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        return response;
      }
    }
    return NextResponse.next();
  }

  // Protected routes - require valid token
  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const decoded = jwtDecode<JWTPayload>(accessToken);
    
    // Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
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
    // Invalid token, redirect to login
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
