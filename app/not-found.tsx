import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          fontFamily: 'var(--font-display), serif',
          fontSize: 'clamp(12rem, 35vw, 30rem)',
          fontWeight: 700,
          color: 'rgba(0,0,0,0.04)',
          lineHeight: 1,
          userSelect: 'none',
          letterSpacing: '-0.04em',
          zIndex: 0,
        }}
      >
        404
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            width: '40px',
            height: '1px',
            background: 'var(--accent)',
            margin: '0 auto 1.5rem',
          }}
        />
        <p
          style={{
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '1rem',
          }}
        >
          Error 404
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display), serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
          }}
        >
          Página no encontrada
        </h1>
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            maxWidth: '26rem',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}
        >
          El contenido que buscás no existe o fue movido a otra sección del archivo.
        </p>
        <Link
          href="/"
          className="not-found-btn"
          style={{
            display: 'inline-block',
            background: 'var(--bg-dark)',
            color: 'var(--white)',
            padding: '12px 28px',
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
