# Wiki "Las Margaritas de Rodo Bulacio" — Plan de Implementación

## Stack Técnico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16.2.9 (App Router) |
| UI | React 19 + Tailwind CSS v4 |
| Lenguaje | TypeScript |
| Base de datos | Supabase (PostgreSQL) |
| Autenticación | Supabase Auth (email/password para admin) |
| Almacenamiento de archivos | Supabase Storage (imágenes, videos) |
| Editor de texto enriquecido | TipTap v2 |
| Deploy | Vercel |

---

## Estructura de Archivos

```
app/
├── layout.tsx                          # Root layout con Navbar
├── page.tsx                            # Landing page de la fundación
├── wiki/
│   └── [slug]/
│       └── page.tsx                    # Página wiki pública (params es Promise)
├── galeria/
│   ├── page.tsx                        # Listado de artistas
│   └── [slug]/
│       └── page.tsx                    # Perfil individual de artista
├── contacto/
│   └── page.tsx                        # Página de contacto y redes (estática editable)
├── buscar/
│   └── page.tsx                        # Búsqueda full-text
├── admin/
│   ├── layout.tsx                      # Layout admin con sidebar (protegido)
│   ├── page.tsx                        # Dashboard admin
│   ├── login/
│   │   └── page.tsx                    # Login del administrador
│   ├── paginas/
│   │   ├── page.tsx                    # Listado de páginas wiki
│   │   ├── nueva/
│   │   │   └── page.tsx                # Crear nueva página
│   │   └── [id]/
│   │       └── editar/
│   │           └── page.tsx            # Editar página existente
│   ├── artistas/
│   │   ├── page.tsx                    # Listado de artistas
│   │   ├── nuevo/
│   │   │   └── page.tsx                # Agregar artista
│   │   └── [id]/
│   │       └── editar/
│   │           └── page.tsx            # Editar artista
│   ├── media/
│   │   └── page.tsx                    # Biblioteca de medios
│   └── configuracion/
│       └── page.tsx                    # Datos de contacto y redes sociales
├── actions/
│   ├── auth.ts                         # 'use server' — login/logout
│   ├── paginas.ts                      # 'use server' — CRUD páginas wiki
│   ├── artistas.ts                     # 'use server' — CRUD artistas
│   ├── media.ts                        # 'use server' — upload/delete archivos
│   └── configuracion.ts               # 'use server' — guardar datos de contacto
└── lib/
    ├── supabase/
    │   ├── server.ts                   # createServerClient (cookies)
    │   └── browser.ts                  # createBrowserClient
    └── utils.ts                        # slugify, formatDate

components/
├── editor/
│   └── RichEditor.tsx                  # 'use client' — TipTap editor
├── wiki/
│   ├── WikiPage.tsx                    # Render HTML del contenido
│   └── TableOfContents.tsx             # Índice desde headings
├── galeria/
│   └── ArtistaCard.tsx                 # Card de artista en el listado
├── admin/
│   ├── AdminSidebar.tsx                # 'use client'
│   ├── PageForm.tsx                    # 'use client' — formulario de página wiki
│   ├── ArtistaForm.tsx                 # 'use client' — formulario de artista
│   ├── MediaUploader.tsx               # 'use client' — upload de archivos
│   └── DeleteButton.tsx                # 'use client' — confirma y llama action
└── ui/
    ├── Navbar.tsx                      # Navegación pública con los 6 ítems del menú
    └── SearchBar.tsx                   # 'use client' — búsqueda
```

---

## Menú de Navegación Principal

Basado en `INFO_PAGINA.md`, el menú tiene exactamente 6 ítems fijos:

| Ítem del menú | Ruta |
|---------------|------|
| Rodolfo Bulacio | `/wiki/rodolfo-bulacio` |
| Fundación Las Margaritas | `/wiki/fundacion-las-margaritas` |
| Sala de Arte Contemporáneo | `/wiki/sala-de-arte` |
| Galería de Artistas | `/galeria` |
| Archivo y Memoria | `/wiki/archivo-y-memoria` |
| Contacto y Redes | `/contacto` |

---

## Esquema de Base de Datos (Supabase)

### Tabla: `paginas`

Páginas wiki de contenido enriquecido (Rodolfo Bulacio, Fundación, Sala de Arte, Archivo y Memoria).

```sql
create table paginas (
  id             uuid primary key default gen_random_uuid(),
  titulo         text not null,
  slug           text not null unique,
  contenido      text,              -- HTML serializado por TipTap
  resumen        text,              -- Texto plano para SEO
  imagen_portada text,              -- URL en Supabase Storage
  seccion        text,              -- 'rodolfo-bulacio' | 'fundacion' | 'sala-de-arte' | 'archivo-y-memoria'
  publicada      boolean default false,
  orden          integer default 0,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger paginas_updated_at
  before update on paginas
  for each row execute function update_updated_at();
```

### Tabla: `artistas`

Fichas individuales de artistas para la Galería de Artistas.

```sql
create table artistas (
  id          uuid primary key default gen_random_uuid(),
  nombre      text not null,
  slug        text not null unique,
  foto        text,              -- URL en Supabase Storage
  biografia   text,              -- HTML serializado por TipTap
  statement   text,              -- Texto curatorial
  trayectoria text,              -- HTML con antecedentes
  activo      boolean default true,
  orden       integer default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create trigger artistas_updated_at
  before update on artistas
  for each row execute function update_updated_at();
```

### Tabla: `media`

```sql
create table media (
  id         uuid primary key default gen_random_uuid(),
  nombre     text not null,
  url        text not null,
  tipo       text not null,   -- 'image' | 'video' | 'document'
  tamanio    bigint,
  created_at timestamptz default now()
);
```

### Tabla: `configuracion`

Datos de contacto y redes sociales editables desde el admin.

```sql
create table configuracion (
  clave  text primary key,   -- 'telefono', 'whatsapp', 'email', 'instagram', etc.
  valor  text,
  label  text                -- Nombre legible del campo
);

-- Seed inicial
insert into configuracion (clave, label, valor) values
  ('telefono',  'Teléfono', ''),
  ('whatsapp',  'WhatsApp (nombre)', 'Gabriel Edmundo Bulacio'),
  ('whatsapp_numero', 'WhatsApp (número)', '3863554304'),
  ('email',     'Correo electrónico', ''),
  ('sitio_web', 'Sitio web', ''),
  ('instagram', 'Instagram', ''),
  ('facebook',  'Facebook', ''),
  ('youtube',   'YouTube', ''),
  ('direccion', 'Dirección', 'Mercado Cultural de Monteros');
```

### Row Level Security (RLS)

```sql
alter table paginas      enable row level security;
alter table artistas     enable row level security;
alter table media        enable row level security;
alter table configuracion enable row level security;

-- Lectura pública
create policy "paginas_public_read"       on paginas       for select using (publicada = true);
create policy "artistas_public_read"      on artistas      for select using (activo = true);
create policy "configuracion_public_read" on configuracion for select using (true);

-- Escritura solo para admins autenticados
create policy "paginas_admin_all"       on paginas       for all using (auth.role() = 'authenticated');
create policy "artistas_admin_all"      on artistas      for all using (auth.role() = 'authenticated');
create policy "media_admin_all"         on media         for all using (auth.role() = 'authenticated');
create policy "configuracion_admin_all" on configuracion for all using (auth.role() = 'authenticated');
```

### Supabase Storage — Bucket `wiki-media`

```
wiki-media/
├── imagenes/     # imágenes de portada y contenido
└── artistas/     # fotos de artistas
```

Política: lectura pública, escritura solo autenticados.

---

## Seed Inicial de Páginas (desde INFO_PAGINA.md)

Al configurar la base de datos, insertar estas páginas con `publicada = true`:

| slug | titulo | seccion |
|------|--------|---------|
| `rodolfo-bulacio` | Rodolfo Bulacio | `rodolfo-bulacio` |
| `fundacion-las-margaritas` | Fundación Las Margaritas de Rodolfo Bulacio | `fundacion` |
| `sala-de-arte` | Sala de Arte Contemporáneo Rodolfo Bulacio | `sala-de-arte` |
| `archivo-y-memoria` | Archivo y Memoria | `archivo-y-memoria` |

El contenido inicial de cada página viene del texto en `INFO_PAGINA.md`.

---

## Autenticación de Administrador

- **Supabase Auth** con email/password — sin registro público.
- El admin se crea directamente desde el panel de Supabase.
- Sesión via **cookies HttpOnly** usando `@supabase/ssr`.
- El layout `app/admin/layout.tsx` verifica sesión en el servidor → redirige a `/admin/login` si no está autenticado.

### Flujo

```
GET /admin/*
  → layout verifica getUser()
  → sin sesión → redirect('/admin/login')

POST login (Server Action)
  → signInWithPassword({ email, password })
  → éxito → redirect('/admin')
  → error → mensaje via useActionState

POST logout (Server Action)
  → signOut() → redirect('/admin/login')
```

---

## Editor de Contenido (TipTap)

`RichEditor.tsx` (`'use client'`) con extensiones:

| Extensión | Capacidad |
|-----------|-----------|
| StarterKit | Headings, bold, italic, listas, blockquote, code |
| Image | Insertar imágenes subidas al Storage |
| Youtube | Embed de videos de YouTube |
| Link | Links con target configurable |
| Table | Tablas editables |
| TextAlign | Alineación de texto |
| Placeholder | Placeholder mientras está vacío |

Contenido guardado como **HTML** en columna `contenido`.

---

## Rutas y Funcionalidades

### Pública

| Ruta | Descripción |
|------|------------|
| `/` | Landing page: hero de la fundación + acceso a las 6 secciones |
| `/wiki/[slug]` | Página wiki con contenido y tabla de contenidos |
| `/galeria` | Listado de artistas en cards |
| `/galeria/[slug]` | Perfil individual de artista |
| `/contacto` | Datos de contacto y redes sociales |
| `/buscar?q=...` | Búsqueda full-text |

### Administración (protegida)

| Ruta | Descripción |
|------|------------|
| `/admin` | Dashboard |
| `/admin/login` | Login |
| `/admin/paginas` | Listado de páginas wiki |
| `/admin/paginas/nueva` | Crear página |
| `/admin/paginas/[id]/editar` | Editar página |
| `/admin/artistas` | Listado de artistas |
| `/admin/artistas/nuevo` | Agregar artista |
| `/admin/artistas/[id]/editar` | Editar artista |
| `/admin/media` | Biblioteca de medios |
| `/admin/configuracion` | Datos de contacto y redes |

---

## Consideraciones de Next.js 16.2.9

- `params` y `searchParams` son **Promise** — siempre hacer `await props.params`.
- `PageProps` / `LayoutProps` son helpers globales — sin importar.
- `refresh()` de `next/cache` para refrescar router post-mutación.
- Server Actions en archivos `'use server'` separados, nunca dentro de Client Components.
- Usar `@supabase/ssr` (no el deprecado `@supabase/auth-helpers-nextjs`).
- Verificar `getUser()` en **cada** Server Action antes de cualquier mutación.

---

## Variables de Entorno (`.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

---

## Orden de Implementación

1. **Supabase clients** — `lib/supabase/server.ts` y `lib/supabase/browser.ts`
2. **Autenticación admin** — actions de login/logout + `app/admin/layout.tsx` + `/admin/login`
3. **Dashboard admin** — `/admin/page.tsx` con sidebar
4. **CRUD páginas wiki** — actions + listado + formulario + editor TipTap
5. **CRUD artistas** — actions + listado + formulario con editor
6. **Upload de media** — MediaUploader + `/admin/media`
7. **Configuración de contacto** — actions + `/admin/configuracion`
8. **Visualización pública** — landing `/`, `/wiki/[slug]`, `/galeria`, `/galeria/[slug]`, `/contacto`
9. **Navbar** con los 6 ítems fijos + búsqueda
10. **SEO** — `generateMetadata` en páginas dinámicas
