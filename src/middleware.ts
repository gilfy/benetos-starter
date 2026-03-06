import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Root → demo chooser (demo.benetos.dev shows the showcase)
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/demo", request.url));
  }
  // Demo routes handle their own locale — skip intl middleware
  if (request.nextUrl.pathname.startsWith("/demo")) {
    return NextResponse.next();
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(de|en)/:path*", "/demo/:path*"],
};
