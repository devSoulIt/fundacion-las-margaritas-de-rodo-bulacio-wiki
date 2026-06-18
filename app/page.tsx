import Link from 'next/link'

const SECCIONES = [
  {
    num: '01',
    titulo: 'Rodolfo Bulacio',
    href: '/wiki/rodolfo-bulacio',
    descripcion: 'Artista visual, performer y referente cultural tucumano cuya obra desafió los límites de su época.',
  },
  {
    num: '02',
    titulo: 'Fundación Las Margaritas',
    href: '/wiki/fundacion-las-margaritas',
    descripcion: 'Nacida del amor y la memoria, la fundación preserva y difunde el legado artístico de Rodolfo.',
  },
  {
    num: '03',
    titulo: 'Sala de Arte Contemporáneo',
    href: '/wiki/sala-de-arte',
    descripcion: 'Espacio en el Mercado Cultural de Monteros que alberga la muestra permanente de Rodolfo Bulacio.',
  },
  {
    num: '04',
    titulo: 'Galería de Artistas',
    href: '/galeria',
    descripcion: 'Artistas que forman parte de la propuesta expositiva de la Fundación Las Margaritas.',
  },
  {
    num: '05',
    titulo: 'Archivo y Memoria',
    href: '/wiki/archivo-y-memoria',
    descripcion: 'Catálogos, publicaciones, fotografías históricas y material audiovisual del legado de Rodolfo.',
  },
  {
    num: '06',
    titulo: 'Contacto y Redes',
    href: '/contacto',
    descripcion: 'Encontrá la Sala en el Mercado Cultural de Monteros y seguinos en nuestras redes.',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: 'var(--bg-dark)',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '88vh',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,0.02) 79px, rgba(255,255,255,0.02) 80px)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-0.1em',
            right: '-0.05em',
            fontFamily: 'var(--font-display), serif',
            fontSize: 'clamp(12rem, 30vw, 28rem)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.025)',
            lineHeight: 1,
            userSelect: 'none',
            letterSpacing: '-0.04em',
          }}
        >
          R
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-20 pt-32 w-full" style={{ position: 'relative', zIndex: 10 }}>
          <div className="max-w-3xl">
            <p
              className="animate-fade-up"
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '1.5rem',
                fontWeight: 500,
              }}
            >
              Fundación — Mercado Cultural de Monteros
            </p>

            <h1
              className="animate-fade-up animate-fade-up-delay-1"
              style={{
                fontFamily: 'var(--font-display), serif',
                fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                fontWeight: 300,
                lineHeight: 1.05,
                color: 'var(--white)',
                letterSpacing: '-0.02em',
                marginBottom: '2rem',
              }}
            >
              Las Margaritas
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--accent)' }}>
                de Rodolfo Bulacio
              </em>
            </h1>

            <p
              className="animate-fade-up animate-fade-up-delay-2"
              style={{
                fontSize: '1rem',
                lineHeight: 1.8,
                color: 'var(--text-faint)',
                maxWidth: '36rem',
                marginBottom: '3rem',
              }}
            >
              Preservamos, investigamos y difundimos el legado artístico de Rodolfo Bulacio —
              artista visual, performer y referente cultural del norte argentino.
            </p>

            <div className="animate-fade-up animate-fade-up-delay-3" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <Link
                href="/wiki/rodolfo-bulacio"
                className="hover-accent-bg"
                style={{
                  background: 'var(--accent)',
                  color: 'var(--white)',
                  padding: '12px 28px',
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  fontWeight: 500,
                  display: 'inline-block',
                }}
              >
                Conocer a Rodolfo
              </Link>
              <Link
                href="/galeria"
                className="btn-outline"
                style={{
                  border: '1px solid var(--border-dark)',
                  color: 'var(--text-faint)',
                  padding: '12px 28px',
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  fontWeight: 400,
                  transition: 'border-color 0.2s, color 0.2s',
                  display: 'inline-block',
                }}
              >
                Galería de Artistas
              </Link>
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, var(--accent) 0%, transparent 60%)',
          }}
        />
      </section>

      {/* Secciones */}
      <section style={{ padding: '6rem 1.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '1.5rem',
              marginBottom: '3rem',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '1.5rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display), serif',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
              }}
            >
              Wiki
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display), serif',
                fontSize: '1.75rem',
                fontWeight: 400,
                color: 'var(--text)',
                letterSpacing: '-0.01em',
                fontStyle: 'italic',
              }}
            >
              Explorá el archivo
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1px',
              background: 'var(--border)',
            }}
          >
            {SECCIONES.map((s, i) => (
              <Link
                key={s.href}
                href={s.href}
                className={`hover-bg-subtle animate-fade-up animate-fade-up-delay-${Math.min(i + 1, 6)}`}
                style={{
                  background: 'var(--bg)',
                  padding: '2rem',
                  textDecoration: 'none',
                  display: 'block',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display), serif',
                    fontSize: '3.5rem',
                    fontWeight: 700,
                    color: 'rgba(0,0,0,0.06)',
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.num}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    fontSize: '1.3rem',
                    fontWeight: 500,
                    color: 'var(--text)',
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {s.titulo}
                </h3>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.65,
                  }}
                >
                  {s.descripcion}
                </p>
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '1.25rem',
                    fontSize: '0.68rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                  }}
                >
                  Ver más →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section
        style={{
          background: 'var(--bg-dark)',
          padding: '6rem 1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-0.3em',
            left: '1rem',
            fontFamily: 'var(--font-display), serif',
            fontSize: 'clamp(8rem, 20vw, 18rem)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.025)',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          "
        </div>
        <div className="max-w-3xl mx-auto" style={{ position: 'relative', zIndex: 10 }}>
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'var(--accent)',
              marginBottom: '2rem',
            }}
          />
          <blockquote
            style={{
              fontFamily: 'var(--font-display), serif',
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'var(--white)',
              lineHeight: 1.55,
              letterSpacing: '-0.01em',
            }}
          >
            Algunas obras no terminan cuando su creador ya no está; continúan creciendo en las personas que las abrazan, las comparten y las mantienen vivas.
          </blockquote>
          <p
            style={{
              marginTop: '2rem',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-faint)',
            }}
          >
            — Fundación Las Margaritas de Rodolfo Bulacio
          </p>
        </div>
      </section>
    </div>
  )
}
