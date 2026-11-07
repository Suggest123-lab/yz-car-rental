"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_SESSION_COOKIE, getAdminSession } from "@/lib/admin-auth";
import { bookingStatuses, type BookingStatus } from "@/lib/bookings";
import { pool } from "@/lib/db";

async function requireAdmin() {
  const cookieStore = await cookies();
  if (!getAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)) throw new Error("Unauthorized.");
}

export async function updateBookingStatus(formData: FormData) {
  await requireAdmin();
  const id = formData.get("bookingId");
  const status = formData.get("status");
  const bookingId = typeof id === "string" ? Number(id) : NaN;
  if (!Number.isSafeInteger(bookingId) || bookingId < 1 || !bookingStatuses.includes(status as BookingStatus)) throw new Error("Invalid booking update.");

  await pool.query(
    `UPDATE booking_details
     SET booking_status_id = (SELECT booking_status_id FROM booking_statuses WHERE code = $1),
         updated_at = now()
     WHERE booking_id = $2`,
    [status, bookingId],
  );
  revalidatePath("/admin/bookings");
}
