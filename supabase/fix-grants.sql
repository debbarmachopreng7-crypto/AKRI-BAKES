grant insert on table public.orders to anon;
grant select, update on table public.orders to authenticated;
grant all on table public.orders to service_role;
grant select on table public.orders to supabase_realtime_admin;

drop policy if exists "anon can insert orders" on public.orders;
create policy "anon can insert orders" on public.orders
  for insert to anon
  with check (order_id like 'AKRI-%');

drop policy if exists "staff can read orders" on public.orders;
create policy "staff can read orders" on public.orders
  for select to authenticated using (true);

drop policy if exists "staff can update orders" on public.orders;
create policy "staff can update orders" on public.orders
  for update to authenticated using (true);
