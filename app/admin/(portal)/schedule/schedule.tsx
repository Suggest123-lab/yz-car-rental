"use client";

import { useMemo, useState } from "react";
import type { Booking, BookingStatus } from "@/lib/bookings";

const statusStyles: Record<BookingStatus, string> = {
  pending: "bg-amber-50 text-amber-900 ring-amber-200",
  confirmed: "bg-blue-50 text-blue-800 ring-blue-200",
  completed: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  cancelled: "bg-slate-100 text-slate-700 ring-slate-200",
};

function displayDate(date: string) {
  return new Intl.DateTimeFormat("en-PH", { weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

function ScheduleCard({ booking }: { booking: Booking }) {
  return (
    <article className="rounded-2xl border border-[#dbe2ef] bg-white p-4 shadow-sm transition hover:border-[#b9c7dc]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-[#14213d]">{booking.carName}</p>
          <p className="mt-1 text-sm text-[#5f6775]">{booking.customerName}</p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[booking.status]}`}>{booking.statusLabel}</span>
      </div>
      <dl className="mt-4 grid gap-3 border-t border-[#e8edf4] pt-4 text-sm sm:grid-cols-2">
        <div><dt className="text-xs font-semibold uppercase tracking-wide text-[#5f6775]">Pick-up</dt><dd className="mt-1 font-medium text-[#14213d]">{booking.pickupTime}</dd><dd className="mt-0.5 text-[#5f6775]">{booking.pickupLocation}</dd></div>
        <div><dt className="text-xs font-semibold uppercase tracking-wide text-[#5f6775]">Return</dt><dd className="mt-1 font-medium text-[#14213d]">{booking.returnDate === booking.pickupDate ? booking.returnTime : `${booking.returnDate} · ${booking.returnTime}`}</dd><dd className="mt-0.5 text-[#5f6775]">{booking.carCategory}</dd></div>
      </dl>
    </article>
  );
}

export default function Schedule({ bookings }: { bookings: Booking[] }) {
  const [car, setCar] = useState("all");
  const [visibility, setVisibility] = useState<"active" | "all">("active");
  const cars = useMemo(() => Array.from(new Map(bookings.map((booking) => [booking.carId, booking])).values()).sort((a, b) => a.carName.localeCompare(b.carName)), [bookings]);
  const scheduled = useMemo(() => bookings
    .filter((booking) => car === "all" || booking.carId === car)
    .filter((booking) => visibility === "all" || booking.status !== "cancelled")
    .sort((a, b) => `${a.pickupDate}T${a.pickupTime}`.localeCompare(`${b.pickupDate}T${b.pickupTime}`)), [bookings, car, visibility]);
  const groups = useMemo(() => {
    const result = new Map<string, Booking[]>();
    for (const booking of scheduled) result.set(booking.pickupDate, [...(result.get(booking.pickupDate) ?? []), booking]);
    return [...result.entries()];
  }, [scheduled]);

  return <section className="mx-auto max-w-6xl">
    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#fca311]">Operations</p>
    <h2 className="mt-2 text-3xl font-semibold tracking-tight">Schedule</h2>
    <p className="mt-3 text-sm text-[#5f6775]">See each vehicle’s rental schedule and filter bookings by car.</p>

    <div className="mt-8 grid gap-4 rounded-2xl border border-[#dbe2ef] bg-white p-4 shadow-sm sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
      <label className="text-sm font-medium text-[#14213d]">Vehicle
        <select value={car} onChange={(event) => setCar(event.target.value)} className="mt-2 block w-full rounded-xl border border-[#cbd5e1] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#fca311] focus:ring-2 focus:ring-[#fca311]/20">
          <option value="all">All vehicles</option>
          {cars.map((item) => <option key={item.carId} value={item.carId}>{item.carName}</option>)}
        </select>
      </label>
      <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#dbe2ef] px-3 py-2.5 text-sm font-medium text-[#14213d]">
        <input type="checkbox" checked={visibility === "all"} onChange={(event) => setVisibility(event.target.checked ? "all" : "active")} className="h-4 w-4 accent-[#14213d]" />
        Include cancelled
      </label>
    </div>

    <p className="mt-6 text-sm text-[#5f6775]">{scheduled.length} {scheduled.length === 1 ? "booking" : "bookings"} shown</p>
    {groups.length ? <div className="mt-4 space-y-8">{groups.map(([date, dateBookings]) => <section key={date} aria-labelledby={`schedule-${date}`}><div className="sticky top-0 z-10 -mx-1 mb-3 bg-[#f8f9fb]/95 px-1 py-2 backdrop-blur"><h3 id={`schedule-${date}`} className="text-sm font-bold text-[#14213d]">{displayDate(date)}</h3></div><div className="grid gap-3 lg:grid-cols-2">{dateBookings.map((booking) => <ScheduleCard key={booking.id} booking={booking} />)}</div></section>)}</div> : <div className="mt-4 rounded-2xl border border-dashed border-[#cbd5e1] bg-white p-8 text-sm leading-6 text-[#5f6775]">No bookings match this filter. Select another vehicle or include cancelled bookings.</div>}
  </section>;
}
