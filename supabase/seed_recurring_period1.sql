-- Seed: Période 1 (du 06/10/25 au 28/03/26)
-- Source: tableau des horaires fourni
-- weekday: 1=lundi … 7=dimanche; times HH:MM (24h)

-- 0) Ensure groups exist
insert into public.groups (name) values
  ('E.D.N.2'),('E.D.N.1'),('C3'),('C2'),('C1'),('M2'),('M1')
on conflict (name) do nothing;

-- 1) Recurring slots per group

-- E.D.N.2
insert into public.training_recurring (group_id, weekday, start_time, end_time, location, valid_from, valid_to) values
  ((select id from public.groups where name='E.D.N.2'), 3, '18:15', '19:00', 'A', '2025-10-06', '2026-03-28'),
  ((select id from public.groups where name='E.D.N.2'), 6, '15:15', '16:00', '2L A', '2025-10-06', '2026-03-28')
on conflict do nothing;

-- E.D.N.1
insert into public.training_recurring (group_id, weekday, start_time, end_time, location, valid_from, valid_to) values
  ((select id from public.groups where name='E.D.N.1'), 1, '17:15', '18:15', '1L A', '2025-10-06', '2026-03-28'),
  ((select id from public.groups where name='E.D.N.1'), 6, '16:00', '17:00', '2L A', '2025-10-06', '2026-03-28')
on conflict do nothing;

-- C3
insert into public.training_recurring (group_id, weekday, start_time, end_time, location, valid_from, valid_to) values
  ((select id from public.groups where name='C3'), 1, '18:15', '19:15', '2L A', '2025-10-06', '2026-03-28'),
  ((select id from public.groups where name='C3'), 6, '17:00', '18:00', 'BC A', '2025-10-06', '2026-03-28')
on conflict do nothing;

-- C2
insert into public.training_recurring (group_id, weekday, start_time, end_time, location, valid_from, valid_to) values
  ((select id from public.groups where name='C2'), 3, '19:00', '20:15', '2L A', '2025-10-06', '2026-03-28'),
  ((select id from public.groups where name='C2'), 6, '18:00', '19:15', 'BC A', '2025-10-06', '2026-03-28')
on conflict do nothing;

-- C1
insert into public.training_recurring (group_id, weekday, start_time, end_time, location, valid_from, valid_to) values
  ((select id from public.groups where name='C1'), 4, '19:00', '20:15', '2L V', '2025-10-06', '2026-03-28'),
  ((select id from public.groups where name='C1'), 6, '18:00', '19:30', 'BC V', '2025-10-06', '2026-03-28')
on conflict do nothing;

-- M2
insert into public.training_recurring (group_id, weekday, start_time, end_time, location, valid_from, valid_to) values
  ((select id from public.groups where name='M2'), 3, '20:15', '21:15', 'BC A', '2025-10-06', '2026-03-28'),
  ((select id from public.groups where name='M2'), 6, '19:30', '20:30', 'BC A', '2025-10-06', '2026-03-28')
on conflict do nothing;

-- M1
insert into public.training_recurring (group_id, weekday, start_time, end_time, location, valid_from, valid_to) values
  ((select id from public.groups where name='M1'), 1, '19:15', '20:15', '2L A', '2025-10-06', '2026-03-28'),
  ((select id from public.groups where name='M1'), 6, '19:30', '20:45', 'BC A', '2025-10-06', '2026-03-28')
on conflict do nothing;

-- 2) Optionally, generate dated sessions for the whole period
-- select public.generate_sessions('2025-10-06', '2026-03-28');

