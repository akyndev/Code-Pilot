import { NextResponse, type NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const maintenanceMode =
    process.env.MAINTENANCE_MODE === "true" ||
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true"

  if (!maintenanceMode || request.nextUrl.pathname === "/maintenance") {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = "/maintenance"

  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
