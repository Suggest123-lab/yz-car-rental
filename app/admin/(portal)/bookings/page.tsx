import { getBookings } from "@/lib/bookings";
import BookingTable from "./booking-table";

export default async function BookingsPage() {
  const bookings = await getBookings();

  return <section className="mx-auto max-w-6xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#fca311]">Operations</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Bookings</h2><p className="mt-3 text-sm text-[#5f6775]">Review new rental requests and update their booking status.</p>{bookings.length === 0 ? <div className="mt-8 rounded-2xl border border-dashed border-[#cbd5e1] bg-white p-8 text-sm leading-6 text-[#5f6775]">No booking requests yet. New requests submitted from the customer booking form will appear here.</div> : <BookingTable bookings={bookings} />}</section>;
}
