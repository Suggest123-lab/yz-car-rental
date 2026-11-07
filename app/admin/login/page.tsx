import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, getAdminSession, isAdminConfigured } from "@/lib/admin-auth";

// A valid login session is time-sensitive, so this page intentionally renders per request.
export const instant = false;

export default async function AdminLoginPage(props: PageProps<"/admin/login">) {
  const [searchParams, cookieStore] = await Promise.all([props.searchParams, cookies()]);
  const session = getAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);

  if (session) {
    redirect("/admin");
  }

  const loginError = searchParams.error === "invalid";
  const isConfigured = isAdminConfigured();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8f4] px-6 py-12 text-[#17352e]">
      <section className="w-full max-w-md rounded-3xl border border-[#dfe5dc] bg-white p-8 shadow-xl shadow-[#173f35]/10 sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e98d48]">YZ Car Rental</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Business sign in</h1>
        <p className="mt-3 text-sm leading-6 text-[#687870]">This area is for the business manager only.</p>

        {!isConfigured ? (
          <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
            Admin access has not been configured yet. Add the three ADMIN_ variables from .env.example to your .env.local file, then restart the server.
          </p>
        ) : null}

        {loginError ? (
          <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">The username or password is not correct.</p>
        ) : null}

        <form action="/api/admin/login" method="post" className="mt-7 space-y-5">
          <label className="block text-sm font-medium">
            Username
            <input name="username" autoComplete="username" required className="mt-2 w-full rounded-xl border border-[#cfd8cf] bg-white px-4 py-3 outline-none transition focus:border-[#173f35] focus:ring-2 focus:ring-[#173f35]/15" />
          </label>
          <label className="block text-sm font-medium">
            Password
            <input name="password" type="password" autoComplete="current-password" required className="mt-2 w-full rounded-xl border border-[#cfd8cf] bg-white px-4 py-3 outline-none transition focus:border-[#173f35] focus:ring-2 focus:ring-[#173f35]/15" />
          </label>
          <button disabled={!isConfigured} className="w-full rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#245b4b] disabled:cursor-not-allowed disabled:opacity-50">Sign in</button>
        </form>

        <Link href="/" className="mt-6 inline-block text-sm text-[#52655e] underline-offset-4 hover:text-[#173f35] hover:underline">Back to customer website</Link>
      </section>
    </main>
  );
}
