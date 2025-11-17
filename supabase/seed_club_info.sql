-- Seed club information
-- Insert initial data for Tanamo club

insert into public.club_info (
  club_id,
  name,
  address,
  email,
  instagram,
  facebook
)
values (
  '2447',
  'Tanamo',
  '239 Chemin des Loisirs 73260 AIGUEBLANCHE',
  'tarentaise.natation.le.morel@gmail.com',
  'https://www.instagram.com/team_tanamo/',
  'https://www.facebook.com/tarentaisenatation.lemorel.7'
)
on conflict (club_id) do update
set
  name = excluded.name,
  address = excluded.address,
  email = excluded.email,
  instagram = excluded.instagram,
  facebook = excluded.facebook,
  updated_at = now();
