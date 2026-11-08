"use client";

import { useMemo, useState } from "react";
import type { Booking, BookingStatus } from "@/lib/bookings";

const statusStyles: Record<BookingStatus, string> = {
  pending: "bg-amber-50 text-amber-900 ring-amber-200",
  confirmed: "bg-blue-50 text-blue-800 ring-blue-200",
  completed: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  cancelled: "bg-slate-100 text-slate-700 ring-slate-200",
};

const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function dateFromKey(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function displayDate(date: string) {
  return new Intl.DateTimeFormat("en-PH", {
    weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  }).format(dateFromKey(date));
}

function monthLabel(date: Date) {
  return new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}

function monthStart(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

function shiftMonth(date: Date, amount: number) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + amount, 1));
}

function bookingsOnDay(bookings: Booking[], day: string) {
  return bookings.filter((booking) => booking.pickupDate <= day && booking.returnDate >= day);
}

function ScheduleCard({ booking }: { booking: Booking }) {
  return (
    <article className="rounded-2xl border border-[#dbe2ef] bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><p className="font-semibold text-[#14213d]">{booking.carName}</p><p className="mt-1 text-sm text-[#5f6775]">{booking.customerName}</p></div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[booking.status]}`}>{booking.statusLabel}</span>
      </div>
      <dl className="mt-4 grid gap-3 border-t border-[#e8edf4] pt-4 text-sm sm:grid-cols-2">
        <div><dt className="text-xs font-semibold uppercase tracking-wide text-[#5f6775]">Pick-up</dt><dd className="mt-1 font-medium text-[#14213d]">{displayDate(booking.pickupDate)} · {booking.pickupTime}</dd><dd className="mt-0.5 text-[#5f6775]">{booking.pickupLocation}</dd></div>
        <div><dt className="text-xs font-semibold uppercase tracking-wide text-[#5f6775]">Return</dt><dd className="mt-1 font-medium text-[#14213d]">{displayDate(booking.returnDate)} · {booking.returnTime}</dd><dd className="mt-0.5 text-[#5f6775]">{booking.carCategory}</dd></div>
      </dl>
    </article>
  );
}

export default function Schedule({ bookings }: { bookings: Booking[] }) {
  const [car, setCar] = useState("all");
  const [visibility, setVisibility] = useState<"active" | "all">("active");
  const [visibleMonth, setVisibleMonth] = useState(() => monthStart(new Date()));
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const cars = useMemo(() => Array.from(new Map(bookings.map((booking) => [booking.carId, booking])).values()).sort((a, b) => a.carName.localeCompare(b.carName)), [bookings]);
  const scheduled = useMemo(() => bookings.filter((booking) => car === "all" || booking.carId === car).filter((booking) => visibility === "all" || booking.status !== "cancelled"), [bookings, car, visibility]);
  const calendarDays = useMemo(() => {
    const firstDay = monthStart(visibleMonth);
    const gridStart = new Date(Date.UTC(firstDay.getUTCFullYear(), firstDay.getUTCMonth(), 1 - firstDay.getUTCDay()));
    return Array.from({ length: 42 }, (_, index) => new Date(Date.UTC(gridStart.getUTCFullYear(), gridStart.getUTCMonth(), gridStart.getUTCDate() + index)));
  }, [visibleMonth]);
  const selectedBookings = useMemo(() => selectedDay ? bookingsOnDay(scheduled, selectedDay) : [], [scheduled, selectedDay]);
  const today = dateKey(new Date());
  const occupiedDayCount = useMemo(() => calendarDays.filter((day) => day.getUTCMonth() === visibleMonth.getUTCMonth() && bookingsOnDay(scheduled, dateKey(day)).length > 0).length, [calendarDays, scheduled, visibleMonth]);

  function moveMonth(amount: number) {
    setVisibleMonth((month) => shiftMonth(month, amount));
    setSelectedDay(null);
  }

  return <section className="mx-auto max-w-6xl">
    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#fca311]">Operations</p>
    <h2 className="mt-2 text-3xl font-semibold tracking-tight">Schedule</h2>
    <p className="mt-3 text-sm text-[#5f6775]">View booked rental days at a glance. Select a highlighted day to see its reservations.</p>

    <details className="group mt-8 rounded-2xl border border-[#dbe2ef] bg-white shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between p-4 text-sm font-semibold text-[#14213d] [&::-webkit-details-marker]:hidden"><span>Filters</span><span className="text-xl leading-none transition-transform group-open:rotate-45">+</span></summary>
      <div className="grid gap-4 border-t border-[#e8edf4] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <label className="text-sm font-medium text-[#14213d]">Vehicle
          <select value={car} onChange={(event) => { setCar(event.target.value); setSelectedDay(null); }} className="mt-2 block w-full rounded-xl border border-[#cbd5e1] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#fca311] focus:ring-2 focus:ring-[#fca311]/20">
            <option value="all">All vehicles</option>{cars.map((item) => <option key={item.carId} value={item.carId}>{item.carName}</option>)}
          </select>
        </label>
        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#dbe2ef] px-3 py-2.5 text-sm font-medium text-[#14213d]"><input type="checkbox" checked={visibility === "all"} onChange={(event) => { setVisibility(event.target.checked ? "all" : "active"); setSelectedDay(null); }} className="h-4 w-4 accent-[#14213d]" />Include cancelled</label>
      </div>
    </details>

    <div className="mt-6 rounded-2xl border border-[#dbe2ef] bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><h3 className="text-xl font-semibold text-[#14213d]">{monthLabel(visibleMonth)}</h3><p className="mt-1 text-sm text-[#5f6775]">{occupiedDayCount} booked {occupiedDayCount === 1 ? "day" : "days"} this month</p></div>
        <div className="flex items-center gap-2"><button type="button" onClick={() => moveMonth(-1)} className="rounded-xl border border-[#cbd5e1] px-3 py-2 text-sm font-semibold text-[#14213d] transition hover:bg-[#f8f9fb]" aria-label="Previous month">←</button><button type="button" onClick={() => { setVisibleMonth(monthStart(new Date())); setSelectedDay(null); }} className="rounded-xl border border-[#cbd5e1] px-3 py-2 text-sm font-semibold text-[#14213d] transition hover:bg-[#f8f9fb]">Today</button><button type="button" onClick={() => moveMonth(1)} className="rounded-xl border border-[#cbd5e1] px-3 py-2 text-sm font-semibold text-[#14213d] transition hover:bg-[#f8f9fb]" aria-label="Next month">→</button></div>
      </div>

      <div className="mt-6 grid grid-cols-7 border-l border-t border-[#e8edf4]">
        {weekdayNames.map((day) => <div key={day} className="border-b border-r border-[#e8edf4] bg-[#f8f9fb] px-2 py-2 text-center text-xs font-bold uppercase tracking-wide text-[#5f6775]">{day}</div>)}
        {calendarDays.map((day) => {
          const key = dateKey(day);
          const dayBookings = bookingsOnDay(scheduled, key);
          const inMonth = day.getUTCMonth() === visibleMonth.getUTCMonth();
          const isSelected = selectedDay === key;
          const isToday = key === today;
          const bookingLabel = dayBookings.length === 1 ? "1 booking" : `${dayBookings.length} bookings`;
          return <button key={key} type="button" onClick={() => setSelectedDay(key)} className={`min-h-20 border-b border-r border-[#e8edf4] p-1.5 text-left transition focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#fca311] sm:min-h-28 sm:p-2 ${inMonth ? "bg-white" : "bg-[#f8f9fb] text-[#94a3b8]"} ${isSelected ? "ring-2 ring-inset ring-[#14213d]" : "hover:bg-[#fff8ed]"}`} aria-label={`${displayDate(key)}${dayBookings.length ? `, ${bookingLabel}` : ", no bookings"}`}>
            <span className={`inline-flex h-7 min-w-7 items-center justify-center rounded-full px-1 text-sm font-semibold ${isToday ? "bg-[#14213d] text-white" : "text-[#14213d]"}`}>{day.getUTCDate()}</span>
            {dayBookings.length > 0 && <span className="mt-1 block rounded-md bg-[#fff1d6] px-1.5 py-1 text-[10px] font-bold leading-tight text-[#9a5600] sm:text-xs">{bookingLabel}</span>}
            <span className="mt-1 hidden truncate text-[11px] text-[#5f6775] sm:block">{dayBookings.slice(0, 2).map((booking) => booking.carName).join(", ")}{dayBookings.length > 2 ? ` +${dayBookings.length - 2}` : ""}</span>
          </button>;
        })}
      </div>
      <p className="mt-4 text-xs text-[#5f6775]"><span className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-[#fff1d6] align-middle" /> Highlighted days have one or more bookings. Multi-day rentals are shown across their full rental period.</p>
    </div>

    {selectedDay && <section className="mt-6" aria-live="polite">
      <div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="text-lg font-semibold text-[#14213d]">Bookings on {displayDate(selectedDay)}</h3><p className="text-sm text-[#5f6775]">{selectedBookings.length} {selectedBookings.length === 1 ? "booking" : "bookings"}</p></div>
      {selectedBookings.length > 0 ? <div className="mt-3 grid gap-3 lg:grid-cols-2">{selectedBookings.map((booking) => <ScheduleCard key={booking.id} booking={booking} />)}</div> : <div className="mt-3 rounded-2xl border border-dashed border-[#cbd5e1] bg-white p-6 text-sm text-[#5f6775]">No bookings are scheduled for this day.</div>}
    </section>}
  </section>;
}
