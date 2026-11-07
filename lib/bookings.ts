import { pool } from "@/lib/db";

export const bookingStatuses = ["pending", "confirmed", "completed", "cancelled"] as const;
export type BookingStatus = (typeof bookingStatuses)[number];

export type Booking = {
  id: string;
  carId: string;
  status: BookingStatus;
  statusLabel: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  returnTime: string;
  pickupLocation: string;
  notes: string | null;
  createdAt: string;
  carName: string;
  carCategory: string;
};

export async function getBookings(): Promise<Booking[]> {
  const { rows } = await pool.query<Booking>(`
    SELECT
      b.booking_id::text AS "id",
      b.car_id::text AS "carId",
      s.code AS "status",
      s.label AS "statusLabel",
      b.customer_name AS "customerName",
      b.customer_phone AS "customerPhone",
      b.customer_email AS "customerEmail",
      to_char(b.pickup_date, 'YYYY-MM-DD') AS "pickupDate",
      to_char(b.return_date, 'YYYY-MM-DD') AS "returnDate",
      to_char(b.pickup_time, 'HH24:MI') AS "pickupTime",
      to_char(b.return_time, 'HH24:MI') AS "returnTime",
      b.pickup_location AS "pickupLocation",
      b.notes,
      to_char(b.created_at AT TIME ZONE 'Asia/Manila', 'Mon DD, YYYY') AS "createdAt",
      c.name AS "carName",
      c.category AS "carCategory"
    FROM booking_details b
    JOIN booking_statuses s ON s.booking_status_id = b.booking_status_id
    JOIN cars c ON c.car_id = b.car_id
    ORDER BY b.created_at DESC, b.booking_id DESC
  `);

  return rows;
}
