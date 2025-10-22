Supabase DB Schema

Files
- `supabase/schema.sql`: tables, triggers, and RLS policies.
- `supabase/seed.sql`: optional seed for initial groups.
- `supabase/seed_recurring.sql`: seed simple des créneaux hebdomadaires (à décommenter/ajuster).
- `supabase/seed_recurring_period1.sql`: seed complet Période 1 (06/10/25 → 28/03/26) basé sur l'image.
- `supabase/seed_recurring_period2.sql`: seed complet Période 2 (08/02/26 → 08/03/26) basé sur l'image (sans lieux).
- `supabase/templates/groups.csv`: modèle CSV des groupes.
- `supabase/templates/training_recurring.csv`: modèle CSV des créneaux hebdomadaires.

Apply via Supabase SQL Editor (recommended)
1) Ouvre ton projet sur app.supabase.com → SQL Editor.
2) Colle le contenu de `supabase/schema.sql` puis Run.
3) (Optionnel) Colle `supabase/seed.sql` pour insérer quelques groupes.
4) Vérifie dans Table editor: tables `groups`, `profiles`, `training_sessions` et `training_recurring` existent, RLS activé.

Notes
- Le trigger crée automatiquement une ligne `profiles` lors d’une nouvelle inscription Auth et copie l'email depuis `auth.users`.
- Les politiques RLS permettent:
  - Lecture de `groups` à tous les utilisateurs authentifiés.
  - Lecture/mise à jour de son propre `profiles` uniquement.
  - Lecture de `training_sessions` à tous les utilisateurs authentifiés.
- Tu pourras ajouter des policies pour `coach`/`admin` plus tard.

Tables incluses
- `groups`: `id`, `name` (nom du groupe, unique), `created_at`.
- `profiles` (table user): `id` (= `auth.users.id`), `email` (copie), `first_name`, `last_name`, `birthdate`, `group_id` (FK vers `groups`).
- `training_sessions`: `id`, `group_id` (FK), `session_date` (date), `start_time` (optionnel), `end_time` (optionnel), `created_at`.
- `training_recurring`: `id`, `group_id` (FK), `weekday` (1=lundi … 7=dimanche), `start_time`, `end_time`, `location` (texte), `valid_from`, `valid_to`, `created_at`.

Important
- Les mots de passe ne sont pas stockés dans `profiles`. Supabase Auth gère l'email + mot de passe dans `auth.users` (sécurisé). Tu utilises le SDK pour login/signup.

Importer tes horaires (depuis ton tableau)
1) Ajoute d'abord les groupes: Table editor → `groups` → Import → sélectionne `supabase/templates/groups.csv` (ou édite manuellement les noms).
2) Remplis `supabase/templates/training_recurring.csv` d’après ton tableau (une ligne par créneau) puis importe dans la table `training_recurring`.
3) Génère les séances datées sur une période: SQL Editor → exécute

   select public.generate_sessions('2025-10-06', '2026-03-28');

   Cela va remplir `training_sessions` pour chaque date comprise dans la période et conforme aux créneaux récurrents.

Notes
- `weekday`: 1=lundi, 2=mardi, …, 7=dimanche.
- `location` est libre (tu peux y mettre les codes du tableau: L, A, V, BC, etc.).

Alternative: Supabase CLI (optionnel)
Si tu préfères automatiser, tu peux exécuter ces fichiers avec le CLI une fois installé et lié à ton projet.

Exemple (remplace <PROJECT_REF>):

  brew install supabase/tap/supabase
  supabase login
  supabase link --project-ref <PROJECT_REF>
  # Exécuter le schéma sur la base distante
  supabase db execute --project-ref <PROJECT_REF> --file supabase/schema.sql
  # (Optionnel) Exécuter le seed
  supabase db execute --project-ref <PROJECT_REF> --file supabase/seed.sql
  # (Optionnel) Seed des créneaux hebdo (après avoir ajusté les heures)
  supabase db execute --project-ref <PROJECT_REF> --file supabase/seed_recurring.sql
  # Seed complet Période 1 (directement exécutable)
  supabase db execute --project-ref <PROJECT_REF> --file supabase/seed_recurring_period1.sql
  supabase db execute --project-ref <PROJECT_REF> --file supabase/seed_recurring_period2.sql

Selon ta version du CLI, la commande `db execute` peut s’appeler différemment.
Si besoin, utilise directement l’éditeur SQL (méthode ci-dessus).
