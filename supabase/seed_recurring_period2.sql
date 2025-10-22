-- Seed: Période 2 (du 08/02/26 au 08/03/26)
-- weekday: 1=lundi … 7=dimanche; times HH:MM (24h)

-- Ensure groups exist
insert into public.groups (name) values
  ('E.D.N.2'),('E.D.N.1'),('C3'),('C2'),('C1'),('M2'),('M1')
on conflict (name) do nothing;

-- E.D.N.2
insert into public.training_recurring (group_id, weekday, start_time, end_time, location, valid_from, valid_to) values
  ((select id from public.groups where name='E.D.N.2'), 3, '18:15', '19:00', null, '2026-02-08', '2026-03-08'),
  ((select id from public.groups where name='E.D.N.2'), 7, '15:15', '16:00', null, '2026-02-08', '2026-03-08')
on conflict do nothing;

-- E.D.N.1
insert into public.training_recurring (group_id, weekday, start_time, end_time, location, valid_from, valid_to) values
  ((select id from public.groups where name='E.D.N.1'), 1, '17:15', '18:15', null, '2026-02-08', '2026-03-08'),
  ((select id from public.groups where name='E.D.N.1'), 7, '16:00', '17:00', null, '2026-02-08', '2026-03-08')
on conflict do nothing;

-- C3
insert into public.training_recurring (group_id, weekday, start_time, end_time, location, valid_from, valid_to) values
  ((select id from public.groups where name='C3'), 1, '18:15', '19:15', null, '2026-02-08', '2026-03-08'),
  ((select id from public.groups where name='C3'), 7, '17:00', '18:00', null, '2026-02-08', '2026-03-08')
on conflict do nothing;

-- C2
insert into public.training_recurring (group_id, weekday, start_time, end_time, location, valid_from, valid_to) values
  ((select id from public.groups where name='C2'), 3, '19:00', '20:15', null, '2026-02-08', '2026-03-08'),
  ((select id from public.groups where name='C2'), 7, '18:00', '19:15', null, '2026-02-08', '2026-03-08')
on conflict do nothing;

-- C1
insert into public.training_recurring (group_id, weekday, start_time, end_time, location, valid_from, valid_to) values
  ((select id from public.groups where name='C1'), 4, '19:00', '20:15', null, '2026-02-08', '2026-03-08'),
  ((select id from public.groups where name='C1'), 7, '18:00', '19:30', null, '2026-02-08', '2026-03-08')
on conflict do nothing;

-- M2
insert into public.training_recurring (group_id, weekday, start_time, end_time, location, valid_from, valid_to) values
  ((select id from public.groups where name='M2'), 3, '20:15', '21:15', null, '2026-02-08', '2026-03-08'),
  ((select id from public.groups where name='M2'), 7, '19:30', '20:30', null, '2026-02-08', '2026-03-08')
on conflict do nothing;

-- M1
insert into public.training_recurring (group_id, weekday, start_time, end_time, location, valid_from, valid_to) values
  ((select id from public.groups where name='M1'), 1, '19:15', '20:15', null, '2026-02-08', '2026-03-08'),
  ((select id from public.groups where name='M1'), 7, '19:30', '20:45', null, '2026-02-08', '2026-03-08')
on conflict do nothing;

-- Optionally generate sessions for the period
-- select public.generate_sessions('2026-02-08', '2026-03-08');

