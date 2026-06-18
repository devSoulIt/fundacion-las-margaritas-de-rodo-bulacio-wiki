import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/app/lib/supabase/server'
import WikiPage from '@/components/wiki/WikiPage'

export async function generateMetadata(props: PageProps<'/galeria/[slug]'>) {
  const { slug } = await props.params
  const supabase = await createClient()
  const { data } = await supabase.from('artistas').select('nombre, statement').eq('slug', slug).single()

  return {
    title: data ? `${data.nombre} — Galería de Artistas` : 'Artista no encontrado',
    description: data?.statement ?? '',
  }
}

export default async function ArtistaPage(props: PageProps<'/galeria/[slug]'>) {
  const { slug } = await props.params
  const supabase = await createClient()

  const { data: artista } = await supabase
    .from('artistas')
    .select('*')
    .eq('slug', slug)
    .eq('activo', true)
    .single()

  if (!artista) notFound()

  return (
    <article>
      {/* Back link */}
      <div style={{ background: 'var(--bg-dark)', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-dark)' }}>
        <div className="max-w-7xl mx-auto">
          <Link
            href="/galeria"
            className="btn-ghost-dark"
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-faint)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            ← Galería de artistas
          </Link>
        </div>
      </div>

      {/* Artist hero */}
      <section style={{ background: 'var(--bg-dark)', padding: '4rem 1.5rem 5rem' }}>
        <div className="max-w-7xl mx-auto">
          <div style={{ display: 'flex', flexDirection: 'row', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {artista.foto && (
              <div
                style={{
                  position: 'relative',
                  width: '220px',
                  aspectRatio: '3/4',
                  flexShrink: 0,
                  overflow: 'hidden',
                  background: 'var(--bg-subtle)',
                }}
              >
                <Image
                  src={artista.foto}
                  alt={artista.nombre}
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>
            )}

            <div style={{ flex: 1, minWidth: '240px', paddingTop: '0.5rem' }}>
              <div style={{ width: '40px', height: '1px', background: 'var(--accent)', marginBottom: '1.5rem' }} />
              <h1
                style={{
                  fontFamily: 'var(--font-display), serif',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'var(--white)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  marginBottom: '1.5rem',
                }}
              >
                {artista.nombre}
              </h1>
              {artista.statement && (
                <p
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.75,
                    color: 'var(--text-faint)',
                    fontStyle: 'italic',
                    maxWidth: '32rem',
                    fontFamily: 'var(--font-display), serif',
                  }}
                >
                  {artista.statement}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        {artista.biografia && (
          <section style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <span
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  fontWeight: 500,
                }}
              >
                Biografía
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>
            <WikiPage contenido={artista.biografia} />
          </section>
        )}

        {artista.trayectoria && (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <span
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  fontWeight: 500,
                }}
              >
                Trayectoria
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>
            <WikiPage contenido={artista.trayectoria} />
          </section>
        )}
      </div>
    </article>
  )
}
