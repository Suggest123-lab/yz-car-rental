-- Extends the cars table created by 000_create_cars_table.sql without removing its existing records.
-- Run this migration against the same PostgreSQL database configured in your environment variables.

BEGIN;

ALTER TABLE public.cars
  ADD COLUMN IF NOT EXISTS category varchar(80) NOT NULL DEFAULT 'Car',
  ADD COLUMN IF NOT EXISTS transmission varchar(40) NOT NULL DEFAULT 'Automatic',
  ADD COLUMN IF NOT EXISTS status varchar(20) NOT NULL DEFAULT 'available',
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'cars_status_check'
  ) THEN
    ALTER TABLE public.cars
      ADD CONSTRAINT cars_status_check
      CHECK (status IN ('available', 'rented', 'maintenance', 'unavailable'));
  END IF;
END $$;

COMMIT;
