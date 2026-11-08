-- Run after the existing migrations to manage the customer gallery from the admin portal.

CREATE TABLE IF NOT EXISTS public.customer_moments (
  customer_moment_id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_name varchar(120),
  occasion varchar(160),
  image_url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS customer_moments_created_at_idx
  ON public.customer_moments (created_at DESC);

ALTER TABLE public.customer_moments
  ALTER COLUMN customer_name DROP NOT NULL;
