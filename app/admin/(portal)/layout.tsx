import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { ADMIN_SESSION_COOKIE, getAdminSession } from "@/lib/admin-auth";
import AdminSidebar from "./admin-sidebar";

// Admin pages require the session before rendering, so they intentionally block per request.
export const instant = false;

export default async function AdminPortalLayout({ children }: LayoutProps<"/admin">) {
  // Session expiry uses Date.now(), so defer authentication until a real request arrives.
  await connection();
  const cookieStore = await cookies();
  const session = getAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#f8f9fb] text-[#14213d] lg:flex">
      <AdminSidebar username={session.username} />
      <div className="min-w-0 flex-1 px-4 py-6 sm:px-10 sm:py-8 lg:px-12 lg:py-10">{children}</div>
    </main>
  );
}
