-- ============================================================
-- Fix RLS: reemplazar auth.role() por auth.uid() IS NOT NULL
-- ============================================================

-- Tablas: borrar políticas viejas y recrear
drop policy if exists "paginas_admin_all"       on paginas;
drop policy if exists "artistas_admin_all"      on artistas;
drop policy if exists "media_admin_all"         on media;
drop policy if exists "configuracion_admin_all" on configuracion;

create policy "paginas_admin_all" on paginas
  for all
  using      ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);

create policy "artistas_admin_all" on artistas
  for all
  using      ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);

create policy "media_admin_all" on media
  for all
  using      ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);

create policy "configuracion_admin_all" on configuracion
  for all
  using      ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);

-- ============================================================
-- Storage: políticas para el bucket wiki-media
-- ============================================================

create policy "storage_public_read" on storage.objects
  for select
  using (bucket_id = 'wiki-media');

create policy "storage_authenticated_upload" on storage.objects
  for insert
  with check (
    bucket_id = 'wiki-media'
    and (select auth.uid()) is not null
  );

create policy "storage_authenticated_delete" on storage.objects
  for delete
  using (
    bucket_id = 'wiki-media'
    and (select auth.uid()) is not null
  );
