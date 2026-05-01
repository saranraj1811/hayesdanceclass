import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_LOGIN_PATH, ADMIN_PANEL_BASE_PATH } from "@/lib/admin-routes";

const ADMIN_COOKIE_NAME = "admin_session";

async function sha256(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function expectedToken(): Promise<string | null> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return sha256(`hayes-admin:${password}`);
}

function tokenMatches(token: string | undefined, expected: string | null): boolean {
  if (!token || !expected) return false;
  return token === expected;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isControlPanel = pathname === ADMIN_PANEL_BASE_PATH || pathname.startsWith(`${ADMIN_PANEL_BASE_PATH}/`);
  const isApiAdmin = pathname === "/api/admin" || pathname.startsWith("/api/admin/");

  if (!isControlPanel && !isApiAdmin) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = tokenMatches(token, await expectedToken());

  if (isApiAdmin) {
    if (!isAuthenticated) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return NextResponse.next();
  }

  const isLoginRoute = pathname === ADMIN_LOGIN_PATH;

  if (isLoginRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(ADMIN_PANEL_BASE_PATH, request.url));
  }

  if (!isLoginRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/control-panel-hdc",
    "/control-panel-hdc/:path*",
    "/api/admin",
    "/api/admin/:path*",
  ],
};
