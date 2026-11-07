-- Run this first when provisioning a new PostgreSQL database.
-- It is safe to run more than once and does not remove existing car records.

BEGIN;

CREATE TABLE IF NOT EXISTS public.cars (
  car_id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name varchar(120) NOT NULL,
  capacity integer NOT NULL CHECK (capacity BETWEEN 1 AND 99),
  starting_rate numeric(12, 2) NOT NULL CHECK (starting_rate >= 0)
);

COMMIT;
