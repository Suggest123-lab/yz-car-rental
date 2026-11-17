import { pool } from "@/lib/db";

export const driverTravelScopes = ["city", "outside-cdo", "outside-region"] as const;
export type DriverTravelScope = (typeof driverTravelScopes)[number];

export type DriverServiceRate = {
  travelScope: DriverTravelScope;
  dailyRate: string;
};

export async function getDriverServiceRates(): Promise<DriverServiceRate[]> {
  const { rows } = await pool.query<DriverServiceRate>(`
    SELECT travel_scope AS "travelScope", daily_rate::text AS "dailyRate"
    FROM driver_service_rates
    ORDER BY CASE travel_scope
      WHEN 'city' THEN 1
      WHEN 'outside-cdo' THEN 2
      WHEN 'outside-region' THEN 3
    END
  `);

  return rows;
}
