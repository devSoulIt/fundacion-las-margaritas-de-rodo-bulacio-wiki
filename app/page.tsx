import Link from 'next/link'

const SECCIONES = [
  {
    num: '01',
    titulo: 'Rodolfo Bulacio',
    href: '/wiki/rodolfo-bulacio',
    descripcion: 'Artista visual, performer y referente cultural tucumano cuya obra desafió los límites de su época.',
    bg: '#e8b6c3',
    text: '#232323',
    linkColor: '#35576b',
  },
  {
    num: '02',
    titulo: 'Fundación Las Margaritas',
    href: '/wiki/fundacion-las-margaritas',
    descripcion: 'Nacida del amor y la memoria, la fundación preserva y difunde el legado artístico de Rodolfo.',
    bg: '#9dd7e8',
    text: '#232323',
    linkColor: '#35576b',
  },
  {
    num: '03',
    titulo: 'Sala de Arte Contemporáneo',
    href: '/wiki/sala-de-arte',
    descripcion: 'Espacio en el Mercado Cultural de Monteros que alberga la muestra permanente de Rodolfo Bulacio.',
    bg: '#f2c94c',
    text: '#232323',
    linkColor: '#35576b',
  },
  {
    num: '04',
    titulo: 'Galería de Artistas',
    href: '/galeria',
    descripcion: 'Artistas que forman parte de la propuesta expositiva de la Fundación Las Margaritas.',
    bg: '#8fcfc9',
    text: '#232323',
    linkColor: '#35576b',
  },
  {
    num: '05',
    titulo: 'Archivo y Memoria',
    href: '/wiki/archivo-y-memoria',
    descripcion: 'Catálogos, publicaciones, fotografías históricas y material audiovisual del legado de Rodolfo.',
    bg: '#35576b',
    text: '#ffffff',
    linkColor: '#f2c94c',
  },
  {
    num: '06',
    titulo: 'Contacto y Redes',
    href: '/contacto',
    descripcion: 'Encontrá la Sala en el Mercado Cultural de Monteros y seguinos en nuestras redes.',
    bg: '#e8b6c3',
    text: '#232323',
    linkColor: '#35576b',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: 'var(--bg)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Scattered daisy decorations on the pink area */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '2.5rem',
            fontSize: '2.5rem',
            opacity: 0.22,
            transform: 'rotate(12deg)',
            pointerEvents: 'none',
            zIndex: 1,
            lineHeight: 1,
          }}
        >
          ✿
        </span>
        <span
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '6rem',
            left: '1.5rem',
            fontSize: '1.8rem',
            opacity: 0.18,
            transform: 'rotate(-20deg)',
            pointerEvents: 'none',
            zIndex: 1,
            lineHeight: 1,
          }}
        >
          ✿
        </span>

        {/* Color block structure */}
        <div className="flex flex-col md:flex-row animate-fade-up" style={{ position: 'relative', zIndex: 2 }}>
          {/* Yellow block — main title */}
          <div
            style={{
              background: 'var(--accent)',
              padding: 'clamp(4rem, 7vw, 6.5rem) clamp(2rem, 6vw, 5rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 1,
              minHeight: 'clamp(360px, 55vw, 560px)',
            }}
          >
            <p
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(35,35,35,0.55)',
                fontWeight: 600,
              }}
            >
              Fundación · Mercado Cultural de Monteros
            </p>

            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: 'clamp(3.5rem, 8.5vw, 7.5rem)',
                  fontWeight: 900,
                  lineHeight: 0.92,
                  color: 'var(--text)',
                  letterSpacing: '-0.03em',
                  marginBottom: '2.75rem',
                }}
              >
                Las<br />Margaritas
              </h1>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <Link
                  href="/wiki/rodolfo-bulacio"
                  className="btn-primary-hero"
                  style={{
                    background: 'var(--text)',
                    color: 'var(--accent)',
                    padding: '13px 30px',
                    fontSize: '0.68rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    fontWeight: 700,
                    display: 'inline-block',
                  }}
                >
                  Conocer a Rodolfo
                </Link>
                <Link
                  href="/galeria"
                  className="btn-outline-hero"
                  style={{
                    border: '2px solid var(--text)',
                    color: 'var(--text)',
                    padding: '13px 30px',
                    fontSize: '0.68rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    fontWeight: 600,
                    display: 'inline-block',
                    background: 'transparent',
                  }}
                >
                  Galería de Artistas
                </Link>
              </div>
            </div>
          </div>

          {/* Pink block — subtitle */}
          <div
            style={{
              background: 'var(--accent-pink)',
              padding: 'clamp(3.5rem, 6vw, 5.5rem) clamp(2rem, 4vw, 3.5rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            className="md:w-[300px]"
          >
            <p
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(53,87,107,0.5)',
                fontWeight: 500,
              }}
            >
              Wiki / Archivo
            </p>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                  fontWeight: 800,
                  color: '#35576b',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  marginBottom: '1.25rem',
                }}
              >
                de Rodolfo<br />Bulacio
              </p>
              <p
                style={{
                  fontSize: '0.82rem',
                  color: 'rgba(53,87,107,0.65)',
                  lineHeight: 1.75,
                  maxWidth: '220px',
                }}
              >
                Artista visual, performer y referente cultural del norte argentino.
              </p>
            </div>
          </div>
        </div>

        {/* Green info bar */}
        <div
          style={{
            background: 'var(--accent-green)',
            padding: '1.15rem clamp(2rem, 6vw, 5rem)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <p
            style={{
              fontSize: '0.66rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(53,87,107,0.85)',
              fontWeight: 600,
            }}
          >
            Preservamos · Investigamos · Difundimos — el legado artístico del norte argentino
          </p>
        </div>
      </section>

      {/* Section header */}
      <section style={{ background: 'var(--bg)', padding: '3.5rem 1.5rem 2rem' }}>
        <div className="max-w-7xl mx-auto">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 900,
                color: 'var(--text)',
                letterSpacing: '-0.025em',
                lineHeight: 1,
              }}
            >
              Explorá el archivo
            </h2>
            <div style={{ flex: 1, height: '2px', background: 'var(--text)', opacity: 0.12 }} />
            <span
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              Wiki
            </span>
          </div>
        </div>
      </section>

      {/* Secciones — solid color cards */}
      <section style={{ padding: '0 1.5rem 5rem' }}>
        <div className="max-w-7xl mx-auto">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '3px',
              background: 'var(--text)',
            }}
          >
            {SECCIONES.map((s, i) => (
              <Link
                key={s.href}
                href={s.href}
                className={`card-color-hover animate-fade-up animate-fade-up-delay-${Math.min(i + 1, 6)}`}
                style={{
                  background: s.bg,
                  padding: '2.5rem 2rem',
                  textDecoration: 'none',
                  display: 'block',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-playfair), serif',
                    fontSize: '4.5rem',
                    fontWeight: 900,
                    color: 'rgba(0,0,0,0.07)',
                    lineHeight: 1,
                    marginBottom: '0.2rem',
                    letterSpacing: '-0.04em',
                  }}
                >
                  {s.num}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair), serif',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: s.text,
                    marginBottom: '0.7rem',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                  }}
                >
                  {s.titulo}
                </h3>
                <p
                  style={{
                    fontSize: '0.83rem',
                    color: s.text,
                    opacity: 0.72,
                    lineHeight: 1.7,
                  }}
                >
                  {s.descripcion}
                </p>
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '1.5rem',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: s.linkColor,
                    fontWeight: 800,
                  }}
                >
                  Ver más →
                </span>
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    right: '1rem',
                    fontSize: '2.25rem',
                    opacity: 0.1,
                    pointerEvents: 'none',
                    lineHeight: 1,
                  }}
                >
                  ✿
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section
        style={{
          background: 'var(--accent-pink)',
          padding: '6rem 1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: '-0.1em',
            right: '4%',
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 'clamp(8rem, 20vw, 16rem)',
            fontWeight: 900,
            color: 'rgba(255,255,255,0.25)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          ✿
        </span>
        <div className="max-w-3xl mx-auto" style={{ position: 'relative', zIndex: 10 }}>
          <div
            style={{
              width: '48px',
              height: '4px',
              background: 'var(--accent)',
              marginBottom: '2.5rem',
            }}
          />
          <blockquote
            style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontStyle: 'italic',
              fontWeight: 600,
              color: 'var(--text)',
              lineHeight: 1.55,
              letterSpacing: '-0.01em',
            }}
          >
            Algunas obras no terminan cuando su creador ya no está; continúan creciendo en las personas que las abrazan, las comparten y las mantienen vivas.
          </blockquote>
          <p
            style={{
              marginTop: '2rem',
              fontSize: '0.66rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(35,35,35,0.55)',
            }}
          >
            — Fundación Las Margaritas de Rodolfo Bulacio
          </p>
        </div>
      </section>
    </div>
  )
}
