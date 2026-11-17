"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, getAdminSession } from "@/lib/admin-auth";
import { driverTravelScopes } from "@/lib/driver-service-rates";
import { pool } from "@/lib/db";

async function requireAdmin() {
  const cookieStore = await cookies();
  if (!getAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)) throw new Error("Unauthorized.");
}

function dailyRate(formData: FormData, travelScope: string) {
  const value = formData.get(`${travelScope}Rate`);
  if (typeof value !== "string" || !/^\d+(?:\.\d{1,2})?$/.test(value)) throw new Error("Enter valid daily driver rates.");

  const rate = Number(value);
  if (!Number.isFinite(rate) || rate < 0 || rate > 1_000_000) throw new Error("Enter valid daily driver rates.");
  return rate;
}

export async function saveDriverServiceRates(formData: FormData) {
  await requireAdmin();

  const rates = driverTravelScopes.map((travelScope) => ({ travelScope, dailyRate: dailyRate(formData, travelScope) }));
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    for (const rate of rates) {
      await client.query(
        `INSERT INTO driver_service_rates (travel_scope, daily_rate)
         VALUES ($1, $2)
         ON CONFLICT (travel_scope)
         DO UPDATE SET daily_rate = EXCLUDED.daily_rate, updated_at = now()`,
        [rate.travelScope, rate.dailyRate],
      );
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }

  revalidatePath("/admin/driver-rates");
}
