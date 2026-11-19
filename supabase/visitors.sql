-- Unique visitor counter. Run once in the Supabase project that backs the portfolio.
create table if not exists public.portfolio_visitors (
  id uuid primary key,
  first_seen timestamptz not null default now()
);

-- Lock the table: anon/authenticated can't read or write it directly.
alter table public.portfolio_visitors enable row level security;
revoke all on public.portfolio_visitors from anon, authenticated;

-- Insert (ignore repeats) and return the unique count.
create or replace function public.register_visit(p_id uuid)
returns bigint
language sql
security definer
set search_path = public
as $$
  insert into public.portfolio_visitors (id) values (p_id) on conflict (id) do nothing;
  select count(*) from public.portfolio_visitors;
$$;

-- Read-only count (used for your own browser and bots).
create or replace function public.visitor_count()
returns bigint
language sql
security definer
set search_path = public
as $$
  select count(*) from public.portfolio_visitors;
$$;

revoke all on function public.register_visit(uuid) from public;
revoke all on function public.visitor_count() from public;
grant execute on function public.register_visit(uuid) to anon;
grant execute on function public.visitor_count() to anon;
