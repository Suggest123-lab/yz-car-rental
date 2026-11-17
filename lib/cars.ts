import { pool } from "@/lib/db";
import type { Car } from "@/lib/car-types";

export type { Car, CarStatus } from "@/lib/car-types";
export { carStatuses } from "@/lib/car-types";

export async function getCars(): Promise<Car[]> {
  const { rows } = await pool.query<Car>(`
    SELECT
      cars.car_id AS "id",
      cars.name,
      cars.capacity,
      cars.city_rate::text AS "cityRate",
      cars.city_rate::text AS "startingRate",
      cars.outside_cdo_rate::text AS "outsideCdoRate",
      cars.outside_region_rate::text AS "outsideRegionRate",
      cars.carwash_rate::text AS "carwashRate",
      cc.name AS category,
      cars.transmission,
      cars.status,
      cars.image_url AS "imageUrl",
      cars.description,
      cars.is_featured AS "isFeatured"
    FROM cars
    JOIN car_categories cc ON cc.category_id = cars.category_id
    ORDER BY cars.is_featured DESC, cars.name ASC, cars.car_id ASC
  `);

  return rows;
}

export type CarCategory = { id: number; name: string };

export async function getCarCategories(): Promise<CarCategory[]> {
  const { rows } = await pool.query<CarCategory>(`
    SELECT category_id AS "id", name
    FROM car_categories
    ORDER BY category_id
  `);
  return rows;
}
