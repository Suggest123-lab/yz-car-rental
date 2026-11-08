"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/schedule", label: "Schedule" },
  { href: "/admin/cars", label: "Car listing" },
];

const customization = [{ href: "/admin/customer-moments", label: "Customer moments" }];

function NavigationLink({ href, label, exact = false, onNavigate }: { href: string; label: string; exact?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname.startsWith(href);

  return <Link href={href} aria-current={active ? "page" : undefined} onClick={onNavigate} className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition ${active ? "bg-[#fca311] text-[#14213d]" : "text-white/75 hover:bg-white/10 hover:text-white"}`}>{label}</Link>;
}

function SidebarContent({ username, onNavigate }: { username: string; onNavigate?: () => void }) {
  return <div className="flex h-full flex-col px-6 py-6">
    <div className="text-center">
      <Link href="/admin" onClick={onNavigate} aria-label="YZ Car Rental admin dashboard" className="inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-[#fca311] focus:ring-offset-2 focus:ring-offset-[#14213d]">
        <Image src="/images/yz_logo.jpg" alt="YZ Car Rental logo" width={64} height={64} priority className="h-14 w-14 rounded-full object-cover shadow-lg shadow-black/30" />
      </Link>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#fca311]">YZ Car Rental</p>
    </div>

    <nav className="mt-7 space-y-1" aria-label="Admin navigation">
      {navigation.map((item) => <NavigationLink key={item.href} {...item} onNavigate={onNavigate} />)}
      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="px-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Customization</p>
        <div className="mt-2 space-y-1">{customization.map((item) => <NavigationLink key={item.href} {...item} onNavigate={onNavigate} />)}</div>
      </div>
    </nav>

    <div className="mt-auto border-t border-white/10 pt-5">
      <p className="text-sm font-medium text-white">{username}</p>
      <form action="/api/admin/logout" method="post" className="mt-3"><button className="w-full rounded-xl bg-red-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 focus:ring-offset-[#14213d] active:bg-red-700">Sign out</button></form>
    </div>
  </div>;
}

export default function AdminSidebar({ username }: { username: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeSidebar = () => setIsOpen(false);

  return <>
    <aside className="hidden h-screen w-72 shrink-0 border-r border-white/10 bg-[#14213d] text-white lg:sticky lg:top-0 lg:block"><SidebarContent username={username} /></aside>

    <header className="flex items-center justify-between border-b border-white/10 bg-[#14213d] px-4 py-3 text-white sm:px-6 lg:hidden">
      <button type="button" onClick={() => setIsOpen(true)} aria-expanded={isOpen} aria-controls="admin-mobile-navigation" className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#fca311]" aria-label="Open admin navigation">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
      </button>
      <Link href="/admin" aria-label="YZ Car Rental admin dashboard" className="flex items-center gap-3">
        <span className="text-right text-xs font-bold uppercase tracking-[0.14em] text-[#fca311]">YZ Car Rental</span>
        <Image src="/images/yz_logo.jpg" alt="YZ Car Rental logo" width={48} height={48} priority className="h-11 w-11 rounded-full object-cover shadow-md shadow-black/30" />
      </Link>
    </header>

    {isOpen ? <>
      <button type="button" aria-label="Close admin navigation" onClick={closeSidebar} className="fixed inset-0 z-40 bg-[#14213d]/50 lg:hidden" />
      <aside id="admin-mobile-navigation" className="fixed inset-y-0 left-0 z-50 w-72 max-w-[86vw] bg-[#14213d] text-white shadow-2xl lg:hidden">
        <button type="button" onClick={closeSidebar} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl text-white/75 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#fca311]" aria-label="Close admin navigation">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </button>
        <SidebarContent username={username} onNavigate={closeSidebar} />
      </aside>
    </> : null}
  </>;
}
