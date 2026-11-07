import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { ADMIN_SESSION_COOKIE, getAdminSession } from "@/lib/admin-auth";
import AdminSidebar from "./admin-sidebar";

export default async function AdminPortalLayout({ children }: LayoutProps<"/admin">) {
  // Session expiry uses the current time, so this authentication check must run per request.
  await connection();
  const cookieStore = await cookies();
  const session = getAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#f7f8f4] text-[#17352e] lg:flex">
      <AdminSidebar username={session.username} />
      <div className="min-w-0 flex-1 px-6 py-8 sm:px-10 lg:px-12 lg:py-10">{children}</div>
    </main>
  );
}
