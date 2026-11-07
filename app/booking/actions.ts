"use server";

import { revalidatePath } from "next/cache";
import { pool } from "@/lib/db";

export type BookingFormState = { error?: string; success?: string };

const initialError = "Please review the highlighted booking information and try again.";

function requiredText(formData: FormData, key: string, maxLength: number) {
  const value = formData.get(key);
  if (typeof value !== "string") throw new Error(initialError);
  const text = value.trim();
  if (!text || text.length > maxLength) throw new Error(initialError);
  return text;
}

function dateValue(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(`${value}T00:00:00Z`))) throw new Error(initialError);
  return value;
}

function timeValue(value: string) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) throw new Error(initialError);
  return value;
}

export async function submitBooking(_previousState: BookingFormState, formData: FormData): Promise<BookingFormState> {
  try {
    const rawCarId = formData.get("carId");
    const carId = typeof rawCarId === "string" ? Number(rawCarId) : NaN;
    if (!Number.isSafeInteger(carId) || carId < 1) throw new Error(initialError);

    const customerName = requiredText(formData, "fullName", 120);
    const customerPhone = requiredText(formData, "phone", 11);
    if (!/^\d{11}$/.test(customerPhone)) throw new Error("Enter an 11-digit mobile number.");
    const customerEmail = requiredText(formData, "email", 254).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) throw new Error(initialError);
    const pickupDate = dateValue(requiredText(formData, "pickupDate", 10));
    const returnDate = dateValue(requiredText(formData, "returnDate", 10));
    if (returnDate < pickupDate) throw new Error("Return date must be on or after the pick-up date.");
    const pickupTime = timeValue(requiredText(formData, "pickupTime", 5));
    const returnTime = timeValue(requiredText(formData, "returnTime", 5));
    const pickupLocation = requiredText(formData, "pickupLocation", 250);
    const notes = typeof formData.get("notes") === "string" ? formData.get("notes")!.toString().trim() : "";
    if (notes.length > 2_000) throw new Error("Notes must be 2,000 characters or fewer.");

    const car = await pool.query<{ id: number }>("SELECT car_id AS id FROM cars WHERE car_id = $1 AND status = 'available'", [carId]);
    if (!car.rowCount) return { error: "That vehicle is no longer available. Please select another car." };

    await pool.query(
      `INSERT INTO booking_details
        (car_id, booking_status_id, customer_name, customer_phone, customer_email, pickup_date, return_date, pickup_time, return_time, pickup_location, notes)
       VALUES ($1, (SELECT booking_status_id FROM booking_statuses WHERE code = 'pending'), $2, $3, $4, $5::date, $6::date, $7::time, $8::time, $9, $10)`,
      [carId, customerName, customerPhone, customerEmail, pickupDate, returnDate, pickupTime, returnTime, pickupLocation, notes || null],
    );

    revalidatePath("/admin/bookings");
    return { success: "Your booking request was sent. Our team will review it and contact you soon." };
  } catch (error) {
    return { error: error instanceof Error ? error.message : initialError };
  }
}
