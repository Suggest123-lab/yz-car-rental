import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  adminSessionCookie,
  createAdminSession,
  hasValidAdminCredentials,
  isAdminConfigured,
} from "@/lib/admin-auth";
import { getRequestOrigin } from "@/lib/request-origin";

export async function POST(request: Request) {
  const origin = getRequestOrigin(request);

  if (!isAdminConfigured()) {
    return NextResponse.redirect(new URL("/admin/login", origin), 303);
  }

  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  if (typeof username !== "string" || typeof password !== "string" || !hasValidAdminCredentials(username, password)) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid", origin), 303);
  }

  const response = NextResponse.redirect(new URL("/admin", origin), 303);
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSession(username), adminSessionCookie);

  return response;
}
