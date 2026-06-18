import Link from 'next/link'
import { createClient } from '@/app/lib/supabase/server'
import { eliminarPagina, togglePublicada } from '@/app/actions/paginas'
import { formatDate } from '@/app/lib/utils'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function AdminPaginasPage() {
  const supabase = await createClient()
  const { data: paginas } = await supabase
    .from('paginas')
    .select('id, titulo, slug, seccion, publicada, updated_at')
    .order('updated_at', { ascending: false })

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--a-accent)', marginBottom: '0.4rem' }}>
            Contenido
          </p>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '2rem', fontWeight: 400, fontStyle: 'italic', color: 'var(--a-text)' }}>
            Páginas
          </h1>
        </div>
        <Link href="/admin/paginas/nueva" className="admin-btn">
          + Nueva página
        </Link>
      </div>

      <div style={{ background: 'var(--a-surface)', border: '1px solid var(--a-border)' }}>
        {paginas?.length === 0 && (
          <p style={{ padding: '3rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--a-text-muted)', fontStyle: 'italic', fontFamily: 'var(--font-cormorant), serif' }}>
            No hay páginas todavía.
          </p>
        )}
        <ul>
          {paginas?.map((p) => (
            <li
              key={p.id}
              style={{
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--a-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--a-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.titulo}
                </p>
                <p style={{ fontSize: '0.72rem', color: 'var(--a-text-muted)', marginTop: '3px' }}>
                  /wiki/{p.slug} · {p.seccion ?? 'sin sección'} · {formatDate(p.updated_at)}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                <form action={togglePublicada.bind(null, p.id, p.publicada)}>
                  <button
                    type="submit"
                    style={{
                      background: 'transparent',
                      border: `1px solid ${p.publicada ? 'var(--a-success)' : 'var(--a-border)'}`,
                      color: p.publicada ? 'var(--a-success)' : 'var(--a-text-muted)',
                      cursor: 'pointer',
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                    }}
                  >
                    {p.publicada ? 'Publicada' : 'Borrador'}
                  </button>
                </form>
                <Link
                  href={`/admin/paginas/${p.id}/editar`}
                  className="a-edit-link"
                  style={{
                    fontSize: '0.68rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--a-text-muted)',
                    textDecoration: 'none',
                    padding: '4px 10px',
                    border: '1px solid var(--a-border)',
                  }}
                >
                  Editar
                </Link>
                <DeleteButton
                  action={eliminarPagina.bind(null, p.id)}
                  confirm={`¿Eliminar "${p.titulo}"?`}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
