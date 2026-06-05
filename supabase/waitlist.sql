-- Run in Supabase Dashboard → SQL Editor
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now(),
  source text default 'hero'
);

create index if not exists waitlist_created_at_idx
  on public.waitlist (created_at desc);

alter table public.waitlist enable row level security;

-- Required so the server-side service role can insert (RLS is bypassed, but PG grants are still needed).
grant all on table public.waitlist to service_role;
grant all on table public.waitlist to postgres;

-- No public RLS policies: client inserts are blocked; use /api/waitlist with the service role key.
