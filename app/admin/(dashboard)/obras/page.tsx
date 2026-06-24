import Link from 'next/link'
import { createClient } from '@/app/lib/supabase/server'
import { eliminarObra } from '@/app/actions/obras'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function AdminObrasPage() {
  const supabase = await createClient()
  const { data: obras } = await supabase
    .from('obras')
    .select('id, titulo, slug, activa, artista_id, artistas(nombre)')
    .order('orden')
    .order('titulo')

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--a-accent)', marginBottom: '0.4rem' }}>
            Galería
          </p>
          <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '2rem', fontWeight: 400, fontStyle: 'italic', color: 'var(--a-text)' }}>
            Obras
          </h1>
        </div>
        <Link href="/admin/obras/nueva" className="admin-btn">
          + Nueva obra
        </Link>
      </div>

      <div style={{ background: 'var(--a-surface)', border: '1px solid var(--a-border)' }}>
        {obras?.length === 0 && (
          <p style={{ padding: '3rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--a-text-muted)', fontStyle: 'italic', fontFamily: 'var(--font-playfair), serif' }}>
            No hay obras todavía.
          </p>
        )}
        <ul>
          {obras?.map((o) => (
            <li
              key={o.id}
              style={{
                padding: '1rem 1.25rem',
                borderBottom: '1px solid var(--a-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div>
                <p style={{ fontSize: '0.9rem', color: 'var(--a-text)' }}>{o.titulo}</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--a-text-muted)', marginTop: '3px' }}>
                  {(o.artistas as unknown as { nombre: string })?.nombre ?? 'Sin artista'} · /obras/{o.slug}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                <span
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    border: `1px solid ${o.activa ? 'var(--a-success)' : 'var(--a-border)'}`,
                    color: o.activa ? 'var(--a-success)' : 'var(--a-text-muted)',
                  }}
                >
                  {o.activa ? 'Activa' : 'Oculta'}
                </span>
                <Link
                  href={`/admin/obras/${o.id}/editar`}
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
                  action={eliminarObra.bind(null, o.id)}
                  confirm={`¿Eliminar "${o.titulo}"?`}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
