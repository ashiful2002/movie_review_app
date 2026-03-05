import { NextResponse, NextRequest } from "next/server";
import { getUser } from "./services/authentication";

const ALLOWED_ROLE = ["ADMIN", "PROVIDER", "CUSTOMER"];

export async function proxy(request: NextRequest) {
  const user = await getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (!ALLOWED_ROLE.includes(user?.role)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
