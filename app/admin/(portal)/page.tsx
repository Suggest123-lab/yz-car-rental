import Link from "next/link";
import { getBookings } from "@/lib/bookings";
import { getCars } from "@/lib/cars";

function manilaDateKey() {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Manila", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const values = Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function shortDate(date: string) {
  return new Intl.DateTimeFormat("en-PH", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

export default async function AdminDashboardPage() {
  const [bookings, cars] = await Promise.all([getBookings(), getCars()]);
  const today = manilaDateKey();
  const pendingBookings = bookings.filter((booking) => booking.status === "pending");
  const activeBookings = bookings.filter((booking) => booking.status === "confirmed");
  const todayPickups = bookings.filter((booking) => booking.pickupDate === today && booking.status !== "cancelled");
  const todayReturns = bookings.filter((booking) => booking.returnDate === today && booking.status !== "cancelled");
  const availableCars = cars.filter((car) => car.status === "available");
  const attentionCars = cars.filter((car) => car.status === "maintenance" || car.status === "unavailable");
  const upcomingBookings = bookings.filter((booking) => booking.status !== "cancelled" && booking.status !== "completed" && booking.pickupDate >= today).sort((a, b) => `${a.pickupDate}${a.pickupTime}`.localeCompare(`${b.pickupDate}${b.pickupTime}`)).slice(0, 5);

  return <section className="mx-auto max-w-6xl">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#fca311]">Operations overview</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Today&apos;s rental desk</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-[#5f6775]">Keep track of booking work, scheduled handoffs, and fleet availability from one place.</p></div>
      <Link href="/admin/bookings" className="rounded-xl bg-[#14213d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#263d66]">Manage bookings</Link>
    </div>

    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <article className="rounded-2xl border border-amber-200 bg-amber-50 p-5"><p className="text-sm font-medium text-amber-900">Needs review</p><p className="mt-3 text-3xl font-semibold text-[#14213d]">{pendingBookings.length}</p><p className="mt-1 text-sm text-amber-900/75">Pending booking {pendingBookings.length === 1 ? "request" : "requests"}</p><Link href="/admin/bookings" className="mt-4 inline-block text-sm font-semibold text-[#14213d] underline-offset-4 hover:underline">Review requests →</Link></article>
      <article className="rounded-2xl border border-blue-200 bg-blue-50 p-5"><p className="text-sm font-medium text-blue-900">Confirmed rentals</p><p className="mt-3 text-3xl font-semibold text-[#14213d]">{activeBookings.length}</p><p className="mt-1 text-sm text-blue-900/75">Currently scheduled</p><Link href="/admin/schedule" className="mt-4 inline-block text-sm font-semibold text-[#14213d] underline-offset-4 hover:underline">Open calendar →</Link></article>
      <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5"><p className="text-sm font-medium text-emerald-900">Available vehicles</p><p className="mt-3 text-3xl font-semibold text-[#14213d]">{availableCars.length}<span className="text-base font-medium text-emerald-900/75"> / {cars.length}</span></p><p className="mt-1 text-sm text-emerald-900/75">Ready for bookings</p><Link href="/admin/cars" className="mt-4 inline-block text-sm font-semibold text-[#14213d] underline-offset-4 hover:underline">View fleet →</Link></article>
      <article className="rounded-2xl border border-[#dbe2ef] bg-white p-5"><p className="text-sm font-medium text-[#5f6775]">Today&apos;s handoffs</p><p className="mt-3 text-3xl font-semibold text-[#14213d]">{todayPickups.length + todayReturns.length}</p><p className="mt-1 text-sm text-[#5f6775]">{todayPickups.length} pickup{todayPickups.length === 1 ? "" : "s"} · {todayReturns.length} return{todayReturns.length === 1 ? "" : "s"}</p><Link href="/admin/schedule" className="mt-4 inline-block text-sm font-semibold text-[#14213d] underline-offset-4 hover:underline">See schedule →</Link></article>
    </div>

    <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.8fr)]">
      <section className="rounded-2xl border border-[#dbe2ef] bg-white shadow-sm"><div className="flex items-center justify-between gap-4 border-b border-[#e8edf4] px-5 py-4"><div><h3 className="font-semibold text-[#14213d]">Upcoming rentals</h3><p className="mt-1 text-sm text-[#5f6775]">Next scheduled pick-ups</p></div><Link href="/admin/schedule" className="text-sm font-semibold text-[#14213d] hover:underline">Full calendar</Link></div>{upcomingBookings.length ? <div className="divide-y divide-[#e8edf4]">{upcomingBookings.map((booking) => <div key={booking.id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"><div className="min-w-0"><p className="font-semibold text-[#14213d]">{booking.carName}</p><p className="mt-1 truncate text-sm text-[#5f6775]">{booking.customerName} · {booking.pickupLocation}</p></div><div className="text-right"><p className="text-sm font-semibold text-[#14213d]">{shortDate(booking.pickupDate)} · {booking.pickupTime}</p><span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${booking.status === "pending" ? "bg-amber-50 text-amber-900" : "bg-blue-50 text-blue-800"}`}>{booking.statusLabel}</span></div></div>)}</div> : <div className="p-8 text-sm leading-6 text-[#5f6775]">No upcoming active rentals. New confirmed bookings will show here.</div>}</section>

      <div className="space-y-6"><section className="rounded-2xl border border-[#dbe2ef] bg-white p-5 shadow-sm"><div className="flex items-center justify-between gap-4"><div><h3 className="font-semibold text-[#14213d]">Fleet attention</h3><p className="mt-1 text-sm text-[#5f6775]">Vehicles not ready for rental</p></div><Link href="/admin/cars" className="text-sm font-semibold text-[#14213d] hover:underline">Manage</Link></div>{attentionCars.length ? <ul className="mt-4 space-y-3">{attentionCars.slice(0, 4).map((car) => <li key={car.id} className="flex items-center justify-between gap-3 rounded-xl bg-[#f8f9fb] px-3 py-2.5"><span className="min-w-0 truncate text-sm font-medium text-[#14213d]">{car.name}</span><span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-semibold capitalize text-slate-700">{car.status}</span></li>)}</ul> : <p className="mt-4 rounded-xl bg-emerald-50 px-3 py-3 text-sm text-emerald-800">All vehicles are ready or currently rented.</p>}</section>
        <section className="rounded-2xl bg-[#14213d] p-5 text-white shadow-sm"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#fca311]">Quick actions</p><div className="mt-4 grid gap-2"><Link href="/admin/bookings" className="rounded-xl bg-white/10 px-3 py-2.5 text-sm font-semibold transition hover:bg-white/15">Review new requests</Link><Link href="/admin/cars" className="rounded-xl bg-white/10 px-3 py-2.5 text-sm font-semibold transition hover:bg-white/15">Update vehicle availability</Link><Link href="/admin/customer-moments" className="rounded-xl bg-white/10 px-3 py-2.5 text-sm font-semibold transition hover:bg-white/15">Upload customer moment</Link></div></section></div>
    </div>
  </section>;
}
