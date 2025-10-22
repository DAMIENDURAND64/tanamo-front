-- Supabase schema for Tanamo (swim club)
-- Tables: groups, profiles (users), training_sessions
-- Triggers: auto-create profile on new auth user (and copy email)
-- RLS: enabled with basic read policies

-- (No custom roles for now; keep schema simple)

-- 2) Groups table
create table if not exists public.groups (
  id bigserial primary key,
  name text not null unique,
  created_at timestamptz not null default now()
);

comment on table public.groups is 'Training groups (nom du groupe)';

-- 3) Profiles table (1 row per auth user)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  -- email is copied from auth.users at signup (not the source of truth)
  email text,
  first_name text,
  last_name text,
  birthdate date,
  group_id bigint references public.groups(id) on delete set null,
  created_at timestamptz not null default now()
);

comment on table public.profiles is 'Extended profile for each auth user';

-- 4) Trigger to auto-create a profile when a user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5) Enable Row Level Security
alter table public.groups enable row level security;
alter table public.profiles enable row level security;

-- 5b) Training sessions table (linked to a group)
create table if not exists public.training_sessions (
  id bigserial primary key,
  group_id bigint not null references public.groups(id) on delete cascade,
  session_date date not null,
  start_time time,
  end_time time,
  created_at timestamptz not null default now(),
  constraint session_time_valid check (
    start_time is null or end_time is null or start_time <= end_time
  )
);

comment on table public.training_sessions is 'Training slots with date (and optional times) per group';
create index if not exists idx_training_sessions_group on public.training_sessions(group_id);
create index if not exists idx_training_sessions_date on public.training_sessions(session_date);
alter table public.training_sessions enable row level security;

-- 5c) Recurring weekly schedule per group (optional, recommended)
create table if not exists public.training_recurring (
  id bigserial primary key,
  group_id bigint not null references public.groups(id) on delete cascade,
  -- ISO weekday: 1=lundi ... 7=dimanche
  weekday smallint not null check (weekday between 1 and 7),
  start_time time not null,
  end_time time not null,
  location text,
  valid_from date,
  valid_to date,
  created_at timestamptz not null default now(),
  constraint recurring_time_valid check (start_time <= end_time)
);

comment on table public.training_recurring is 'Weekly recurring slots per group, with optional validity period';
create index if not exists idx_training_recurring_group_weekday on public.training_recurring(group_id, weekday);
alter table public.training_recurring enable row level security;

-- 6) Policies
-- Groups: allow any authenticated user to read groups
drop policy if exists "read groups" on public.groups;
create policy "read groups" on public.groups
  for select
  to authenticated
  using (true);

-- Profiles: a user can read and update their own profile
drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "update own profile" on public.profiles;
create policy "update own profile" on public.profiles
  for update
  to authenticated
  using (auth.uid() = id);

-- Training sessions: allow any authenticated user to read sessions
drop policy if exists "read training sessions" on public.training_sessions;
create policy "read training sessions" on public.training_sessions
  for select
  to authenticated
  using (true);

-- Recurring schedule: allow any authenticated user to read
drop policy if exists "read training recurring" on public.training_recurring;
create policy "read training recurring" on public.training_recurring
  for select
  to authenticated
  using (true);

-- (Optional) Insert/update/delete policies for coaches/admin can be added later.

-- 7) Helpful indexes
create index if not exists idx_profiles_group_id on public.profiles(group_id);

-- 8) Helper: generate dated sessions from recurring between two dates
-- Run from SQL editor (privileged) when the period changes.
create or replace function public.generate_sessions(from_date date, to_date date)
returns void
language plpgsql
as $$
declare
  d date;
  rec record;
begin
  if to_date < from_date then
    raise exception 'to_date (%) must be >= from_date (%)', to_date, from_date;
  end if;

  d := from_date;
  while d <= to_date loop
    for rec in
      select * from public.training_recurring r
      where (r.valid_from is null or d >= r.valid_from)
        and (r.valid_to   is null or d <= r.valid_to)
        and extract(isodow from d)::int = r.weekday
    loop
      insert into public.training_sessions (group_id, session_date, start_time, end_time)
      values (rec.group_id, d, rec.start_time, rec.end_time)
      on conflict do nothing;
    end loop;
    d := d + 1;
  end loop;
end;
$$;

-- Done
