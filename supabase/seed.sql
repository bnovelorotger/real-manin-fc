insert into public.players (id, name, is_regular) values
  ('00000000-0000-0000-0000-000000000001', 'Alex', true),
  ('00000000-0000-0000-0000-000000000002', 'Gonzalo', true),
  ('00000000-0000-0000-0000-000000000003', 'Pablo', true),
  ('00000000-0000-0000-0000-000000000004', 'Claudio', true),
  ('00000000-0000-0000-0000-000000000005', 'Jon', true),
  ('00000000-0000-0000-0000-000000000006', 'Ramón', true),
  ('00000000-0000-0000-0000-000000000007', 'Berni', true),
  ('00000000-0000-0000-0000-000000000008', 'Mateo', true),
  ('00000000-0000-0000-0000-000000000009', 'Marco', true),
  ('00000000-0000-0000-0000-000000000010', 'Bruno', true),
  ('00000000-0000-0000-0000-000000000011', 'Neil', true),
  ('00000000-0000-0000-0000-000000000012', 'Joel', true)
on conflict (id) do update set name = excluded.name, is_regular = excluded.is_regular;

insert into public.matches (id, matchday, kickoff_at, home_team, away_team, venue) values
  ('10000000-0000-0000-0000-000000000001', 1, '2026-09-17T22:05:00+02:00', 'CROSTA TEAM', 'Real Manin', 'Escola Pia F7'),
  ('10000000-0000-0000-0000-000000000002', 2, '2026-10-01T21:10:00+02:00', 'Real Manin', 'BAMBINI FC', 'Escola Pia F7'),
  ('10000000-0000-0000-0000-000000000003', 3, '2026-10-08T21:10:00+02:00', 'Los Pichirris', 'Real Manin', 'Escola Pia F7'),
  ('10000000-0000-0000-0000-000000000004', 4, '2026-10-15T22:05:00+02:00', 'Real Manin', 'Atlético Romano', 'Escola Pia F7'),
  ('10000000-0000-0000-0000-000000000005', 5, '2026-10-22T22:05:00+02:00', 'Gambeta FC', 'Real Manin', 'Escola Pia F7'),
  ('10000000-0000-0000-0000-000000000006', 6, '2026-10-29T22:05:00+01:00', 'Real Manin', 'Jueves Trampa', 'Escola Pia F7'),
  ('10000000-0000-0000-0000-000000000007', 7, '2026-11-05T21:10:00+01:00', 'Addmira', 'Real Manin', 'Escola Pia F7'),
  ('10000000-0000-0000-0000-000000000008', 8, '2026-11-12T23:00:00+01:00', 'Real Manin', 'SANTOS', 'Escola Pia F7'),
  ('10000000-0000-0000-0000-000000000009', 9, '2026-11-26T23:00:00+01:00', 'CROSTA TEAM', 'Real Manin', 'Escola Pia F7'),
  ('10000000-0000-0000-0000-000000000010', 10, '2026-12-03T23:00:00+01:00', 'Real Manin', 'BAMBINI FC', 'Escola Pia F7'),
  ('10000000-0000-0000-0000-000000000011', 11, '2026-12-10T21:10:00+01:00', 'Los Pichirris', 'Real Manin', 'Escola Pia F7'),
  ('10000000-0000-0000-0000-000000000012', 12, '2026-12-17T22:05:00+01:00', 'Real Manin', 'Atlético Romano', 'Escola Pia F7'),
  ('10000000-0000-0000-0000-000000000013', 13, '2027-01-07T22:05:00+01:00', 'Gambeta FC', 'Real Manin', 'Escola Pia F7'),
  ('10000000-0000-0000-0000-000000000014', 14, '2027-01-14T22:05:00+01:00', 'Real Manin', 'Jueves Trampa', 'Escola Pia F7'),
  ('10000000-0000-0000-0000-000000000015', 15, '2027-01-21T22:05:00+01:00', 'Addmira', 'Real Manin', 'Escola Pia F7'),
  ('10000000-0000-0000-0000-000000000016', 16, '2027-01-28T23:00:00+01:00', 'Real Manin', 'SANTOS', 'Escola Pia F7')
on conflict (id) do update set
  matchday = excluded.matchday,
  kickoff_at = excluded.kickoff_at,
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  venue = excluded.venue;
