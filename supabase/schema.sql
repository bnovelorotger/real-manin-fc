create extension if not exists pgcrypto;

create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  is_regular boolean not null default false,
  created_at timestamptz not null default now()
);

create unique index if not exists players_name_lower_unique on public.players (lower(name));

create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  matchday integer not null unique,
  kickoff_at timestamptz not null,
  home_team text not null,
  away_team text not null,
  venue text not null,
  created_at timestamptz not null default now()
);

create index if not exists matches_kickoff_at_idx on public.matches (kickoff_at);

create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches(id) on delete cascade,
  player_id uuid not null references public.players(id) on delete cascade,
  status text not null check (status in ('going', 'maybe', 'not_going')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (match_id, player_id)
);

create index if not exists attendance_match_id_idx on public.attendance (match_id);
create index if not exists attendance_player_id_idx on public.attendance (player_id);

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
     and not exists (
       select 1 from pg_publication_tables
       where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'attendance'
     ) then
    alter publication supabase_realtime add table public.attendance;
  end if;
end
$$;

create or replace function public.set_attendance_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists attendance_updated_at on public.attendance;
create trigger attendance_updated_at
before update on public.attendance
for each row execute function public.set_attendance_updated_at();

alter table public.players enable row level security;
alter table public.matches enable row level security;
alter table public.attendance enable row level security;

drop policy if exists "public can read players" on public.players;
create policy "public can read players" on public.players for select to anon, authenticated using (true);
drop policy if exists "public can create players" on public.players;
create policy "public can create players" on public.players for insert to anon, authenticated with check (length(trim(name)) between 1 and 80 and is_regular = false);

drop policy if exists "public can read matches" on public.matches;
create policy "public can read matches" on public.matches for select to anon, authenticated using (true);

drop policy if exists "public can read attendance" on public.attendance;
create policy "public can read attendance" on public.attendance for select to anon, authenticated using (true);
drop policy if exists "public can create attendance" on public.attendance;
create policy "public can create attendance" on public.attendance for insert to anon, authenticated with check (true);
drop policy if exists "public can update attendance" on public.attendance;
create policy "public can update attendance" on public.attendance for update to anon, authenticated using (true) with check (true);

-- This app intentionally has no user authentication. The anon key is public and
-- these policies make the small friends-only group effectively link-accessible.
-- Restrict the policies or add auth before using the app for sensitive data.
