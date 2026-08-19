-- Akri Bakes — Supabase schema for live order data.
-- Run this in: Supabase Dashboard → SQL Editor → New query → Run.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_id text unique not null,
  name text not null,
  phone text not null,
  method text default 'Pickup',
  payment text not null,
  pickup_date text,
  pickup_time text,
  delivery_area text,
  delivery_charge numeric not null default 0,
  address text,
  notes text,
  items jsonb not null default '[]'::jsonb,
  total numeric not null default 0,
  has_custom_cake boolean not null default false,
  status text not null default 'Pending',
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

-- Grants for the API roles (created via direct connection, so set explicitly).
grant insert on table public.orders to anon;
grant select, update on table public.orders to authenticated;
grant all on table public.orders to service_role;
grant select on table public.orders to supabase_realtime_admin;

-- Customers (anon): can place an order, but not read or modify others.
drop policy if exists "anon can insert orders" on public.orders;
create policy "anon can insert orders" on public.orders
  for insert to anon
  with check (order_id like 'AKRI-%');

-- Allow reading orders for the admin (anon reads for dashboard display).
drop policy if exists "anon can read orders" on public.orders;
create policy "anon can read orders" on public.orders
  for select to anon
  using (true);

-- Staff (Supabase Auth users): read and update every order.
drop policy if exists "staff can read orders" on public.orders;
create policy "staff can read orders" on public.orders
  for select to authenticated using (true);

drop policy if exists "staff can update orders" on public.orders;
create policy "staff can update orders" on public.orders
  for update to authenticated using (true);

-- Allow anon to update order status (admin uses local password, not Supabase Auth).
drop policy if exists "anon can update order status" on public.orders;
create policy "anon can update order status" on public.orders
  for update to anon
  using (true)
  with check (true);

-- Push new / changed orders to the admin dashboard instantly.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'orders'
  ) then
    alter publication supabase_realtime add table public.orders;
  end if;
end $$;
