import { getBookings } from "@/lib/bookings";
import Schedule from "./schedule";

export default async function SchedulePage() {
  const bookings = await getBookings();

  return <Schedule bookings={bookings} />;
}
