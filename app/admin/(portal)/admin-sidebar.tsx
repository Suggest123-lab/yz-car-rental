"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/cars", label: "Car listing" },
];

const customization = [
  { href: "/admin/settings/contact", label: "Contact details" },
  { href: "/admin/settings/payments", label: "Payment types" },
  { href: "/admin/customer-moments", label: "Customer moments" },
];

function NavigationLink({ href, label, exact = false }: { href: string; label: string; exact?: boolean }) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition ${active ? "bg-[#fca311] text-[#14213d]" : "text-white/75 hover:bg-white/10 hover:text-white"}`}
    >
      {label}
    </Link>
  );
}

export default function AdminSidebar({ username }: { username: string }) {
  return (
    <aside className="border-b border-white/10 bg-[#14213d] text-white lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col px-5 py-6 sm:px-8 lg:px-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#fca311]">YZ Car Rental</p>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">Business manager</h1>
        </div>

        <nav className="mt-7 flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible" aria-label="Admin navigation">
          <div className="flex min-w-max gap-2 lg:block lg:space-y-1">
            {navigation.map((item) => <NavigationLink key={item.href} {...item} />)}
          </div>
          <div className="hidden border-t border-white/10 pt-5 lg:mt-6 lg:block">
            <p className="px-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Customization</p>
            <div className="mt-2 space-y-1">
              {customization.map((item) => <NavigationLink key={item.href} {...item} />)}
            </div>
          </div>
          <div className="flex min-w-max gap-2 lg:hidden">
            {customization.map((item) => <NavigationLink key={item.href} {...item} />)}
          </div>
        </nav>

        <div className="mt-auto hidden border-t border-white/10 pt-5 lg:block">
          <p className="text-sm font-medium text-white">{username}</p>
          <form action="/api/admin/logout" method="post" className="mt-3">
            <button className="text-sm text-white/70 underline-offset-4 transition hover:text-white hover:underline">Sign out</button>
          </form>
        </div>
      </div>
    </aside>
  );
}
