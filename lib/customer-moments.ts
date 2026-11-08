import { pool } from "@/lib/db";

export type CustomerMoment = {
  id: string;
  customerName: string | null;
  occasion: string | null;
  imageUrl: string;
};

export async function getCustomerMoments(): Promise<CustomerMoment[]> {
  const { rows } = await pool.query<CustomerMoment>(`
    SELECT
      customer_moment_id::text AS "id",
      customer_name AS "customerName",
      occasion,
      image_url AS "imageUrl"
    FROM customer_moments
    ORDER BY created_at DESC, customer_moment_id DESC
  `);

  return rows;
}
