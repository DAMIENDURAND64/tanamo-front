-- Ajout des colonnes pour les informations de profil détaillées
-- Date: 2025-11-16

-- Ajouter les colonnes de nage spécialité et anti-spécialité
alter table public.profiles
  add column if not exists specialty_swim text,
  add column if not exists anti_specialty_swim text;

comment on column public.profiles.specialty_swim is 'Nage de spécialité du nageur (ex: Papillon, Dos, Brasse, Nage Libre)';
comment on column public.profiles.anti_specialty_swim is 'Nage anti-spécialité du nageur';

-- Renommer birthdate en birth_date pour cohérence avec le code frontend
-- (Si la colonne birthdate existe déjà)
do $$
begin
  if exists (
    select 1 from information_schema.columns 
    where table_schema = 'public' 
    and table_name = 'profiles' 
    and column_name = 'birthdate'
  ) and not exists (
    select 1 from information_schema.columns 
    where table_schema = 'public' 
    and table_name = 'profiles' 
    and column_name = 'birth_date'
  ) then
    alter table public.profiles rename column birthdate to birth_date;
  end if;
end $$;

-- Renommer group_id en group_name si besoin, ou ajouter group_name comme colonne calculée
-- Pour l'instant on garde group_id et on fera une jointure dans le code
-- Mais on peut ajouter un helper pour récupérer le nom du groupe

-- Fonction pour récupérer les horaires d'entraînement d'un groupe
-- Cette fonction sera utilisée dans le code TypeScript
create or replace function public.get_group_training_hours(p_group_id bigint)
returns table (
  weekday_name text,
  time_slot text,
  location text
) as $$
begin
  return query
  select 
    case tr.weekday
      when 1 then 'Lundi'
      when 2 then 'Mardi'
      when 3 then 'Mercredi'
      when 4 then 'Jeudi'
      when 5 then 'Vendredi'
      when 6 then 'Samedi'
      when 7 then 'Dimanche'
    end as weekday_name,
    to_char(tr.start_time, 'HH24:MI') || ' - ' || to_char(tr.end_time, 'HH24:MI') as time_slot,
    coalesce(tr.location, '') as location
  from public.training_recurring tr
  where tr.group_id = p_group_id
    and (tr.valid_from is null or tr.valid_from <= current_date)
    and (tr.valid_to is null or tr.valid_to >= current_date)
  order by tr.weekday, tr.start_time;
end;
$$ language plpgsql security definer;

comment on function public.get_group_training_hours is 'Retourne les horaires d''entraînement formatés pour un groupe donné';

-- Créer une vue pour faciliter la récupération des infos complètes du profil
create or replace view public.profiles_with_group as
select 
  p.*,
  g.name as group_name
from public.profiles p
left join public.groups g on p.group_id = g.id;

comment on view public.profiles_with_group is 'Vue combinant profiles et le nom du groupe';

-- Accorder les permissions de lecture sur la vue
grant select on public.profiles_with_group to authenticated;
grant select on public.profiles_with_group to anon;
