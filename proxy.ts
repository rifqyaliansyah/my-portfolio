import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

export function proxy(request: NextRequest) {
  const isMaintenancePage = request.nextUrl.pathname === "/maintenance";

  if (isMaintenanceMode) {
    return isMaintenancePage
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/maintenance", request.url));
  }

  if (isMaintenancePage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
