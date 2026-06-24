import Link from 'next/link'
import Image from 'next/image'
import heroBg from '../backgroundhero.webp'

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
  /* {
    num: '05',
    titulo: 'Archivo y Memoria',
    href: '/wiki/archivo-y-memoria',
    descripcion: 'Catálogos, publicaciones, fotografías históricas y material audiovisual del legado de Rodolfo.',
    bg: '#B9DCD5  ',
    text: '#ffffff',
    linkColor: '#f2c94c',
  }, */
  {
    num: '05',
    titulo: 'Contacto y Redes',
    href: '/contacto',
    descripcion: 'Encontrá la Sala en el Mercado Cultural de Monteros y seguinos en nuestras redes.',
    bg: '#B9DCD5',
    text: '#262626',
    linkColor: '#35576b',
  },
]

/**
 * SVG daisy — 12 petals with bezier curves for a natural look.
 * White petals with subtle border, three-tone yellow center.
 */
function Daisy({
  size = 60,
  rotate = 0,
  opacity = 1,
  style,
}: {
  size?: number
  rotate?: number
  opacity?: number
  style?: React.CSSProperties
}) {
  const r = size / 2
  // Petal geometry (all relative to center 0,0)
  const base  = r * 0.30  // petal base radius (where it meets center)
  const tip   = r * 0.92  // petal tip radius (near edge)
  const hw    = r * 0.185 // half-width at the widest point
  const cp1y  = r * 0.44  // bezier control point 1 (depth)
  const cp2y  = r * 0.76  // bezier control point 2 (depth)

  // Petal path: smooth oval from -base to -tip (pointing up in local coords)
  const d = [
    `M 0,${-base}`,
    `C  ${hw},${-cp1y}  ${hw},${-cp2y}  0,${-tip}`,
    `C ${-hw},${-cp2y} ${-hw},${-cp1y}  0,${-base}`,
    'Z',
  ].join(' ')

  const centerR = r * 0.21

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden
      style={{ transform: `rotate(${rotate}deg)`, opacity, display: 'block', flexShrink: 0, ...style }}
    >
      <g transform={`translate(${r} ${r})`}>
        {Array.from({ length: 12 }).map((_, i) => (
          <path
            key={i}
            d={d}
            fill="white"
            stroke="rgba(53,87,107,0.13)"
            strokeWidth="0.5"
            transform={`rotate(${i * 30})`}
          />
        ))}
        {/* Three-tone center for depth */}
        <circle r={centerR}           fill="#f2c94c" />
        <circle r={centerR * 0.68}    fill="#d4ab3a" />
        <circle r={centerR * 0.36}    fill="#b8870a" />
      </g>
    </svg>
  )
}

export default function HomePage() {
  return (
    <div>
      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: 'clamp(480px, 62vw, 680px)',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-dark)',
        }}
      >
        {/* ── Background image ── */}
        <Image
          src={heroBg}
          alt=""
          fill
          priority
          style={{ objectFit: 'contain', objectPosition: 'right top' }}
        />

      

        {/* ── Hero content ── */}
        <div
          className="animate-fade-up"
          style={{
            position: 'relative',
            zIndex: 2,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'clamp(5rem, 8vw, 8rem) clamp(2rem, 6vw, 5rem) clamp(3.5rem, 5vw, 5.5rem)',
            maxWidth: '700px',
          }}
        >
          <p
            style={{
              fontSize: '0.58rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255)',
              fontWeight: 600,
              marginBottom: '1.6rem',
            }}
          >
            Fundación · Mercado Cultural de Monteros
          </p>

          <p
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(157,215,232,0.95)',
              fontWeight: 700,
              marginBottom: '0.5rem',
            }}
          >
            Sala de Exposiciones
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: 'clamp(3.6rem, 9vw, 8rem)',
              fontWeight: 900,
              lineHeight: 0.9,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              marginBottom: '0.6rem',
            }}
          >
            Las<br />Margaritas
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: 'clamp(1.25rem, 2.8vw, 1.9rem)',
              fontWeight: 700,
              color: 'var(--accent-celeste)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            de Rodolfo Bulacio
          </p>

          <p
            style={{
              fontSize: '0.88rem',
              color: 'rgba(255,255,255,0.58)',
              lineHeight: 1.75,
              maxWidth: '380px',
              marginBottom: '2.5rem',
            }}
          >
            Artista visual, performer y referente cultural del norte argentino.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <Link
              href="/wiki/rodolfo-bulacio"
              className="btn-primary-hero"
              style={{
                background: '#ffffff',
                color: 'var(--bg-dark)',
                padding: '13px 30px',
                fontSize: '0.67rem',
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
                border: '2px solid rgba(255,255,255,0.65)',
                color: '#ffffff',
                padding: '13px 30px',
                fontSize: '0.67rem',
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

        {/* ── Green info bar ── */}
        <div
          style={{
            background: 'var(--accent-green)',
            padding: '1.1rem clamp(2rem, 6vw, 5rem)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <p
            style={{
              fontSize: '0.64rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255)',
              fontWeight: 600,
            }}
          >
            Preservamos · Investigamos · Difundimos — el legado artístico del norte argentino
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION HEADER
      ═══════════════════════════════════════════════════ */}
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
            <div style={{ flex: 1, height: '2px', backgroundClip: 'white', opacity: 0.12 }} />
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

      {/* ═══════════════════════════════════════════════════
          COLOR CARDS
      ═══════════════════════════════════════════════════ */}
      <section style={{ padding: '0 1.5rem 5rem' }}>
        <div className="max-w-7xl mx-auto">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '3px',
              backgroundClip: 'white',
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
                {/* Card corner daisy */}
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    bottom: '0.6rem',
                    right: '0.8rem',
                    opacity: 0.14,
                    pointerEvents: 'none',
                  }}
                >
                  <Daisy size={40} rotate={20} opacity={1} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          QUOTE — celeste background (like the folleto feel)
      ═══════════════════════════════════════════════════ */}
      <section
        style={{
          background: 'var(--accent-celeste)',
          padding: '6rem 1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Large decorative daisy — top right, subtle */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-3rem',
            right: '2%',
            pointerEvents: 'none',
            opacity: 0.22,
          }}
        >
          <Daisy size={260} rotate={10} opacity={1} />
        </div>
        {/* Small one — bottom left */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '-2rem',
            left: '5%',
            pointerEvents: 'none',
            opacity: 0.15,
          }}
        >
          <Daisy size={130} rotate={-18} opacity={1} />
        </div>

        <div className="max-w-3xl mx-auto" style={{ position: 'relative', zIndex: 10 }}>
          <div
            style={{
              width: '48px',
              height: '4px',
              background: 'var(--bg-dark)',
              marginBottom: '2.5rem',
              opacity: 0.45,
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
              color: 'rgba(53,87,107,0.6)',
            }}
          >
            — Fundación Las Margaritas de Rodolfo Bulacio
          </p>
        </div>
      </section>
    </div>
  )
}
