import Link from 'next/link'
import { createClient } from '@/app/lib/supabase/server'
import SearchBar from '@/components/ui/SearchBar'

export const metadata = {
  title: 'Buscar — Fundación Las Margaritas',
}

export default async function BuscarPage(props: PageProps<'/buscar'>) {
  const { q } = await props.searchParams as { q?: string }
  const query = q?.trim() ?? ''

  const supabase = await createClient()

  const [{ data: paginas }, { data: artistas }] = await Promise.all([
    query
      ? supabase
          .from('paginas')
          .select('titulo, slug, resumen')
          .eq('publicada', true)
          .or(`titulo.ilike.%${query}%,resumen.ilike.%${query}%,contenido.ilike.%${query}%`)
          .order('titulo')
          .limit(20)
      : { data: [] },
    query
      ? supabase
          .from('artistas')
          .select('nombre, slug, statement')
          .eq('activo', true)
          .or(`nombre.ilike.%${query}%,statement.ilike.%${query}%,biografia.ilike.%${query}%`)
          .order('nombre')
          .limit(10)
      : { data: [] },
  ])

  const total = (paginas?.length ?? 0) + (artistas?.length ?? 0)

  return (
    <div>
      {/* Header */}
      <section
        style={{
          background: 'var(--bg-dark)',
          padding: '5rem 1.5rem 4rem',
          borderBottom: '1px solid var(--border-dark)',
        }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display), serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--white)',
              letterSpacing: '-0.02em',
              marginBottom: '2rem',
            }}
          >
            Buscar en el archivo
          </h1>
          <SearchBar defaultValue={query} />
        </div>
      </section>

      {/* Results */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          {query && (
            <>
              <p
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: total === 0 ? 'var(--text-muted)' : 'var(--accent)',
                  marginBottom: '2.5rem',
                }}
              >
                {total === 0
                  ? `Sin resultados para "${query}"`
                  : `${total} resultado${total !== 1 ? 's' : ''} para "${query}"`}
              </p>

              {paginas && paginas.length > 0 && (
                <section style={{ marginBottom: '3rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
                      Páginas
                    </span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {paginas.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/wiki/${p.slug}`}
                        className="hover-indent"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          padding: '1rem 0',
                          borderBottom: '1px solid var(--border)',
                          textDecoration: 'none',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-display), serif',
                            fontSize: '1.05rem',
                            color: 'var(--text)',
                            marginBottom: '0.25rem',
                          }}
                        >
                          {p.titulo}
                        </span>
                        {p.resumen && (
                          <span
                            style={{
                              fontSize: '0.8rem',
                              color: 'var(--text-muted)',
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {p.resumen}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {artistas && artistas.length > 0 && (
                <section>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
                      Artistas
                    </span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {artistas.map((a) => (
                      <Link
                        key={a.slug}
                        href={`/galeria/${a.slug}`}
                        className="hover-indent"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          padding: '1rem 0',
                          borderBottom: '1px solid var(--border)',
                          textDecoration: 'none',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-display), serif',
                            fontSize: '1.05rem',
                            color: 'var(--text)',
                            marginBottom: '0.25rem',
                          }}
                        >
                          {a.nombre}
                        </span>
                        {a.statement && (
                          <span
                            style={{
                              fontSize: '0.8rem',
                              color: 'var(--text-muted)',
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {a.statement}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {!query && (
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                fontStyle: 'italic',
                fontFamily: 'var(--font-display), serif',
              }}
            >
              Escribí un término para buscar en páginas y artistas.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
