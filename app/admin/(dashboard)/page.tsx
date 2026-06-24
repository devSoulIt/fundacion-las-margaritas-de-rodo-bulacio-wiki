import Link from 'next/link'
import { createClient } from '@/app/lib/supabase/server'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [{ count: totalPaginas }, { count: totalArtistas }, { count: totalObras }, { count: totalMedia }] =
    await Promise.all([
      supabase.from('paginas').select('*', { count: 'exact', head: true }),
      supabase.from('artistas').select('*', { count: 'exact', head: true }),
      supabase.from('obras').select('*', { count: 'exact', head: true }),
      supabase.from('media').select('*', { count: 'exact', head: true }),
    ])

  const { data: ultimasPaginas } = await supabase
    .from('paginas')
    .select('id, titulo, slug, publicada, updated_at')
    .order('updated_at', { ascending: false })
    .limit(5)

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--a-accent)', marginBottom: '0.4rem' }}>
          Resumen
        </p>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '2rem', fontWeight: 400, fontStyle: 'italic', color: 'var(--a-text)' }}>
          Dashboard
        </h1>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--a-border)', marginBottom: '2rem' }}>
        {[
          { label: 'Páginas', count: totalPaginas ?? 0, href: '/admin/paginas' },
          { label: 'Artistas', count: totalArtistas ?? 0, href: '/admin/artistas' },
          { label: 'Obras', count: totalObras ?? 0, href: '/admin/obras' },
          { label: 'Archivos', count: totalMedia ?? 0, href: '/admin/media' },
        ].map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="a-stat-card"
            style={{
              background: 'var(--a-surface)',
              padding: '1.5rem',
              textDecoration: 'none',
              display: 'block',
            }}
          >
            <p style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '3rem', fontWeight: 300, color: 'var(--a-accent)', lineHeight: 1 }}>
              {stat.count}
            </p>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--a-text-muted)', marginTop: '0.5rem' }}>
              {stat.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent pages */}
      <div style={{ background: 'var(--a-surface)', border: '1px solid var(--a-border)' }}>
        <div
          style={{
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--a-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--a-text-muted)' }}>
            Páginas recientes
          </p>
          <Link
            href="/admin/paginas/nueva"
            style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--a-accent)', textDecoration: 'none' }}
          >
            + Nueva
          </Link>
        </div>
        <ul>
          {ultimasPaginas?.map((p) => (
            <li
              key={p.id}
              style={{
                padding: '0.875rem 1.25rem',
                borderBottom: '1px solid var(--a-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--a-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.titulo}
                </p>
                <p style={{ fontSize: '0.72rem', color: 'var(--a-text-muted)', marginTop: '2px' }}>/wiki/{p.slug}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: p.publicada ? 'var(--a-success)' : 'var(--a-text-faint)',
                    display: 'inline-block',
                  }}
                  title={p.publicada ? 'Publicada' : 'Borrador'}
                />
                <Link
                  href={`/admin/paginas/${p.id}/editar`}
                  className="a-row-link"
                  style={{ fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--a-text-muted)', textDecoration: 'none' }}
                >
                  Editar
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
