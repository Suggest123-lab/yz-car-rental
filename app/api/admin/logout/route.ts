import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";
import { getRequestOrigin } from "@/lib/request-origin";

export function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", getRequestOrigin(request)), 303);
  response.cookies.set(ADMIN_SESSION_COOKIE, "", { path: "/", maxAge: 0 });

  return response;
}
