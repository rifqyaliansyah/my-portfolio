import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

export function proxy(request: NextRequest) {
  if (!isMaintenanceMode) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/maintenance") {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/maintenance", request.url));
}

export const config = {
  matcher: ["/((?!_next|api|maintenance|.*\\..*).*)"],
};
