import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/app/lib/supabase/server'

export const metadata = {
  title: 'Obras — Fundación Las Margaritas',
  description: 'Todas las obras de los artistas de la Fundación Las Margaritas de Rodolfo Bulacio.',
}

export default async function ObrasPage() {
  const supabase = await createClient()
  const { data: obras } = await supabase
    .from('obras')
    .select('id, titulo, slug, imagen, artista_id, artistas(nombre, slug)')
    .eq('activa', true)
    .order('orden')
    .order('titulo')

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
        <div className="max-w-7xl mx-auto">
          <p
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '1rem',
            }}
          >
            Fundación Las Margaritas
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display), serif',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--white)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}
          >
            Obras
          </h1>
          <p
            style={{
              maxWidth: '34rem',
              fontSize: '0.9rem',
              lineHeight: 1.75,
              color: 'var(--text-faint)',
            }}
          >
            Producciones artísticas de los artistas que forman parte de la propuesta expositiva
            de la Fundación Las Margaritas de Rodolfo Bulacio.
          </p>
        </div>
      </section>

      {/* Obras grid */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div className="max-w-7xl mx-auto">
          {(!obras || obras.length === 0) && (
            <div
              style={{
                padding: '6rem 0',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-display), serif',
                fontSize: '1.1rem',
                fontStyle: 'italic',
              }}
            >
              En construcción — próximamente se incorporarán las obras.
            </div>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '2px',
              background: 'var(--border)',
            }}
          >
            {obras?.map((o) => {
              const artista = o.artistas as unknown as { nombre: string; slug: string }
              return (
                <Link
                  key={o.id}
                  href={`/galeria/${artista?.slug}/obras`}
                  className="gallery-card"
                  style={{
                    background: 'var(--bg)',
                    textDecoration: 'none',
                    display: 'block',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Image */}
                  <div
                    className="image-zoom"
                    style={{
                      position: 'relative',
                      aspectRatio: '1',
                      background: 'var(--bg-subtle)',
                      overflow: 'hidden',
                    }}
                  >
                    {o.imagen ? (
                      <Image
                        src={o.imagen}
                        alt={o.titulo}
                        fill
                        className="object-cover"
                        style={{ transition: 'transform 0.6s ease' }}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-display), serif',
                            fontSize: '4rem',
                            color: 'var(--border)',
                            fontStyle: 'italic',
                          }}
                        >
                          {o.titulo.charAt(0)}
                        </span>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div
                      className="gallery-overlay"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(26,22,20,0.85) 0%, transparent 50%)',
                        display: 'flex',
                        alignItems: 'flex-end',
                        padding: '1.5rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.68rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--accent)',
                        }}
                      >
                        Ver obras →
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: '1.25rem 1.25rem 1.5rem' }}>
                    <div
                      style={{
                        width: '24px',
                        height: '1px',
                        background: 'var(--accent)',
                        marginBottom: '0.75rem',
                      }}
                    />
                    <h2
                      style={{
                        fontFamily: 'var(--font-display), serif',
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        color: 'var(--text)',
                        marginBottom: '0.3rem',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {o.titulo}
                    </h2>
                    {artista?.nombre && (
                      <p
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          lineHeight: 1.6,
                        }}
                      >
                        {artista.nombre}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
