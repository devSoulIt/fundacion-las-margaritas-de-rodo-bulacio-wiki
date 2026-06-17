-- ============================================================
-- Wiki Las Margaritas de Rodolfo Bulacio — Schema de Supabase
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================

-- Función para updated_at automático
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============================================================
-- Tablas
-- ============================================================

create table paginas (
  id             uuid primary key default gen_random_uuid(),
  titulo         text not null,
  slug           text not null unique,
  contenido      text,
  resumen        text,
  imagen_portada text,
  seccion        text,
  publicada      boolean default false,
  orden          integer default 0,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

create trigger paginas_updated_at
  before update on paginas
  for each row execute function update_updated_at();

create table artistas (
  id          uuid primary key default gen_random_uuid(),
  nombre      text not null,
  slug        text not null unique,
  foto        text,
  biografia   text,
  statement   text,
  trayectoria text,
  activo      boolean default true,
  orden       integer default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create trigger artistas_updated_at
  before update on artistas
  for each row execute function update_updated_at();

create table media (
  id         uuid primary key default gen_random_uuid(),
  nombre     text not null,
  url        text not null,
  tipo       text not null,
  tamanio    bigint,
  created_at timestamptz default now()
);

create table configuracion (
  clave  text primary key,
  valor  text,
  label  text
);

-- ============================================================
-- Seed de configuración inicial
-- ============================================================

insert into configuracion (clave, label, valor) values
  ('telefono',        'Teléfono',              ''),
  ('whatsapp',        'WhatsApp (nombre)',      'Gabriel Edmundo Bulacio'),
  ('whatsapp_numero', 'WhatsApp (número)',      '3863554304'),
  ('email',           'Correo electrónico',     ''),
  ('sitio_web',       'Sitio web',              ''),
  ('instagram',       'Instagram',              ''),
  ('facebook',        'Facebook',               ''),
  ('youtube',         'YouTube',                ''),
  ('direccion',       'Dirección',              'Mercado Cultural de Monteros, Sala de Arte Contemporáneo Rodolfo Bulacio');

-- ============================================================
-- Seed de páginas iniciales (contenido de INFO_PAGINA.md)
-- ============================================================

insert into paginas (titulo, slug, seccion, publicada, resumen, contenido) values
(
  'Rodolfo Bulacio',
  'rodolfo-bulacio',
  'rodolfo-bulacio',
  true,
  'Artista visual, performer y referente cultural tucumano cuya obra desafió los límites de su época.',
  '<p>Rodolfo Bulacio nació el 1 de octubre de 1970 en Monteros, Tucumán. Desde joven, su obra se convirtió en un faro de libertad y ruptura en la escena artística del norte argentino.</p><p>Bulacio exploró el cuerpo, la moda y la performatividad a través de colectivos como <strong>Flora y Fauna</strong> y <strong>Tenor Grasso</strong>, transformando cada performance en un acto de desafío a las normas.</p><p>Su arte, siempre en diálogo con la identidad, la economía y la política, creó un pop crítico que desarmaba los símbolos patrios y los reconfiguraba en nuevas formas de resistencia.</p><p>Sus obras, como el <em>Escudo Nacional</em> —donde las margaritas reemplazan laureles— o <em>One Rodo – One Dollar</em>, son un manifiesto de su tiempo: una memoria queer que se resiste a desaparecer.</p><p>Hoy, su legado es un faro. La Fundación Las Margaritas lo honra, manteniendo viva su voz, su rebeldía y su capacidad de transformar la memoria en arte.</p>'
),
(
  'Fundación Las Margaritas de Rodolfo Bulacio',
  'fundacion-las-margaritas',
  'fundacion',
  true,
  'Nacida del amor y la memoria, la fundación preserva y difunde el legado artístico de Rodolfo Bulacio.',
  '<p>La Fundación Las Margaritas de Rodolfo Bulacio nace del amor, la memoria y la convicción de que el arte puede trascender el tiempo.</p><p>Tras la partida de Rodolfo, su madre, <strong>Olga Rosa Jiménez de Bulacio</strong> —afectuosamente conocida como <em>"Porota"</em>— asumió una promesa tan sencilla como inmensa: que Rodolfo seguiría viviendo a través de su obra.</p><p>Desde su creación, la Fundación trabaja para preservar, investigar y difundir el legado de Rodolfo, promoviendo al mismo tiempo el desarrollo de nuevos artistas, la circulación del arte contemporáneo y el acceso de la comunidad a experiencias culturales transformadoras.</p><p>Hoy, la Fundación funciona en su oficina de gestión cultural, ubicada en el <strong>Mercado Cultural</strong>, resguardando la muestra permanente de Rodolfo en la Sala de Arte Contemporáneo Rodolfo Bulacio.</p><p>La Fundación entiende al arte como una herramienta de encuentro, inclusión, reflexión y construcción colectiva.</p>'
),
(
  'Sala de Arte Contemporáneo Rodolfo Bulacio',
  'sala-de-arte',
  'sala-de-arte',
  true,
  'Espacio en el Mercado Cultural de Monteros que alberga la muestra permanente de Rodolfo Bulacio.',
  '<p>La Sala de Arte Contemporáneo Rodolfo Bulacio forma parte del <strong>Mercado Cultural de Monteros</strong> y constituye uno de los espacios más importantes dedicados al arte contemporáneo en el sur de Tucumán.</p><p>Inaugurada como parte de la puesta en valor y recuperación del histórico Mercado Municipal, la sala alberga la <strong>muestra permanente</strong> del artista visual Rodolfo Bulacio.</p><p>La reinauguración del Mercado Cultural marcó un hecho histórico para la ciudad de Monteros, consolidando un espacio destinado al encuentro entre las artes visuales, la literatura, la formación cultural y la participación comunitaria.</p><p>La sala propone una <strong>programación dinámica</strong> que incluye:</p><ul><li>Exposiciones temporarias</li><li>Muestras colectivas e individuales</li><li>Actividades educativas y talleres</li><li>Encuentros con artistas y conversatorios</li><li>Proyectos de vinculación comunitaria</li></ul><p>Más que un espacio expositivo, la Sala Rodolfo Bulacio busca ser un lugar de encuentro, reflexión y construcción cultural, donde el arte se convierta en una herramienta de transformación social y desarrollo comunitario.</p>'
),
(
  'Archivo y Memoria',
  'archivo-y-memoria',
  'archivo-y-memoria',
  true,
  'Catálogos, publicaciones, fotografías históricas y material audiovisual del legado de Rodolfo Bulacio.',
  '<p>Esta sección reúne documentos, publicaciones, material audiovisual y registros vinculados a la trayectoria de Rodolfo Bulacio, la Fundación Las Margaritas y la Sala de Arte Contemporáneo.</p><p>Su objetivo es preservar y compartir la memoria artística y cultural construida a lo largo de los años.</p><h2>Contenidos</h2><ul><li>Catálogos de muestras</li><li>Publicaciones</li><li>Notas periodísticas</li><li>Entrevistas</li><li>Fotografías históricas</li><li>Material audiovisual</li><li>Reconocimientos y distinciones</li><li>Archivo documental</li></ul><p><em>Este archivo se irá completando progresivamente con el material disponible.</em></p>'
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table paginas       enable row level security;
alter table artistas      enable row level security;
alter table media         enable row level security;
alter table configuracion enable row level security;

-- Lectura pública
create policy "paginas_public_read"
  on paginas for select using (publicada = true);

create policy "artistas_public_read"
  on artistas for select using (activo = true);

create policy "configuracion_public_read"
  on configuracion for select using (true);

-- Escritura solo para admins autenticados
create policy "paginas_admin_all"
  on paginas for all using (auth.role() = 'authenticated');

create policy "artistas_admin_all"
  on artistas for all using (auth.role() = 'authenticated');

create policy "media_admin_all"
  on media for all using (auth.role() = 'authenticated');

create policy "configuracion_admin_all"
  on configuracion for all using (auth.role() = 'authenticated');

-- ============================================================
-- Storage: crear bucket wiki-media con lectura pública
-- (Hacerlo desde el panel de Supabase: Storage → New bucket
--  Nombre: wiki-media, Public bucket: ✓)
-- ============================================================
