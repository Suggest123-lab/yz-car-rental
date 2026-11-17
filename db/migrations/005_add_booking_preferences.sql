-- Run after 004_create_customer_moments.sql.
-- Records the requested travel area and optional booking services.

BEGIN;

ALTER TABLE public.booking_details
  ADD COLUMN IF NOT EXISTS travel_scope varchar(20) NOT NULL DEFAULT 'city',
  ADD COLUMN IF NOT EXISTS driver_requested boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS carwash_requested boolean NOT NULL DEFAULT false;

ALTER TABLE public.booking_details
  DROP CONSTRAINT IF EXISTS booking_details_travel_scope_check,
  ADD CONSTRAINT booking_details_travel_scope_check
    CHECK (travel_scope IN ('city', 'outside-cdo', 'outside-region'));

COMMIT;
