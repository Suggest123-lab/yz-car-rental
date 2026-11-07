-- Run after 000_create_cars_table.sql and 001_extend_cars_for_admin.sql against the configured PostgreSQL database.
-- Booking statuses are kept in their own table so the operational workflow is explicit.

BEGIN;

CREATE TABLE IF NOT EXISTS public.booking_statuses (
  code varchar(20) PRIMARY KEY,
  label varchar(40) NOT NULL,
  sort_order smallint NOT NULL UNIQUE,
  is_final boolean NOT NULL DEFAULT false
);

INSERT INTO public.booking_statuses (code, label, sort_order, is_final)
VALUES
  ('pending', 'Pending review', 1, false),
  ('confirmed', 'Confirmed', 2, false),
  ('completed', 'Completed', 3, true),
  ('cancelled', 'Cancelled', 4, true)
ON CONFLICT (code) DO UPDATE
SET label = EXCLUDED.label,
    sort_order = EXCLUDED.sort_order,
    is_final = EXCLUDED.is_final;

CREATE TABLE IF NOT EXISTS public.booking_details (
  booking_id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  car_id bigint NOT NULL REFERENCES public.cars(car_id) ON DELETE RESTRICT,
  status_code varchar(20) NOT NULL DEFAULT 'pending'
    REFERENCES public.booking_statuses(code) ON UPDATE CASCADE ON DELETE RESTRICT,
  customer_name varchar(120) NOT NULL,
  customer_phone varchar(40) NOT NULL,
  customer_email varchar(254) NOT NULL,
  pickup_date date NOT NULL,
  return_date date NOT NULL,
  pickup_time time NOT NULL,
  return_time time NOT NULL,
  pickup_location varchar(250) NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT booking_details_date_order CHECK (return_date >= pickup_date),
  CONSTRAINT booking_details_notes_length CHECK (notes IS NULL OR char_length(notes) <= 2000)
);

CREATE INDEX IF NOT EXISTS booking_details_status_created_at_idx
  ON public.booking_details (status_code, created_at DESC);
CREATE INDEX IF NOT EXISTS booking_details_car_dates_idx
  ON public.booking_details (car_id, pickup_date, return_date);

COMMIT;
