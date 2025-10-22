-- Simple seed for recurring schedule
-- 1) Ensure groups exist (safe upserts by name)
insert into public.groups (name)
values
  ('E.D.N.2'),
  ('E.D.N.1'),
  ('C3'),
  ('C2'),
  ('C1'),
  ('M2'),
  ('M1')
on conflict (name) do nothing;

-- 2) Define the validity period for this season (update as needed)
-- Replace with your real dates from the timetable header
-- Example period: from 2025-10-06 to 2026-03-28
-- You can also leave them NULL for always valid

-- 3) Seed recurring slots
-- Use: weekday 1=lundi … 7=dimanche; time in HH:MM (24h)
-- Location is optional (put your codes: L, A, V, BC, etc.)

-- E.D.N.1
-- insert into public.training_recurring (group_id, weekday, start_time, end_time, location, valid_from, valid_to)
-- values
--   ((select id from public.groups where name='E.D.N.1'), 1, '17:15', '18:15', 'A', '2025-10-06', '2026-03-28');

-- E.D.N.2
-- insert into public.training_recurring (group_id, weekday, start_time, end_time, location, valid_from, valid_to)
-- values
--   ((select id from public.groups where name='E.D.N.2'), 3, '18:15', '19:00', 'A', '2025-10-06', '2026-03-28');

-- C3
-- insert into public.training_recurring (group_id, weekday, start_time, end_time, location, valid_from, valid_to)
-- values
--   ((select id from public.groups where name='C3'), 3, '19:00', '20:15', 'L', '2025-10-06', '2026-03-28');

-- C2
-- insert into public.training_recurring (group_id, weekday, start_time, end_time, location, valid_from, valid_to)
-- values
--   ((select id from public.groups where name='C2'), 4, '19:00', '20:15', 'L', '2025-10-06', '2026-03-28');

-- C1
-- insert into public.training_recurring (group_id, weekday, start_time, end_time, location, valid_from, valid_to)
-- values
--   ((select id from public.groups where name='C1'), 6, '18:00', '19:00', 'A', '2025-10-06', '2026-03-28');

-- M2
-- insert into public.training_recurring (group_id, weekday, start_time, end_time, location, valid_from, valid_to)
-- values
--   ((select id from public.groups where name='M2'), 6, '18:00', '19:00', 'BC', '2025-10-06', '2026-03-28');

-- M1
-- insert into public.training_recurring (group_id, weekday, start_time, end_time, location, valid_from, valid_to)
-- values
--   ((select id from public.groups where name='M1'), 6, '19:30', '20:45', 'A', '2025-10-06', '2026-03-28');

-- Remove the leading -- on the lines above once you confirm exact hours.
-- Then run this file in Supabase SQL Editor (or CLI) and generate dated sessions:
--   select public.generate_sessions('2025-10-06', '2026-03-28');

