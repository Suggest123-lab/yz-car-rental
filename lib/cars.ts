import { pool } from "@/lib/db";
import type { Car } from "@/lib/car-types";

export type { Car, CarStatus } from "@/lib/car-types";
export { carStatuses } from "@/lib/car-types";

export async function getCars(): Promise<Car[]> {
  const { rows } = await pool.query<Car>(`
    SELECT
      car_id AS "id",
      name,
      capacity,
      starting_rate::text AS "startingRate",
      category,
      transmission,
      status,
      image_url AS "imageUrl",
      description,
      is_featured AS "isFeatured"
    FROM cars
    ORDER BY is_featured DESC, name ASC, car_id ASC
  `);

  return rows;
}
