import Link from 'next/link'
import { createClient } from '@/app/lib/supabase/server'
import { eliminarArtista } from '@/app/actions/artistas'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function AdminArtistasPage() {
  const supabase = await createClient()
  const { data: artistas } = await supabase
    .from('artistas')
    .select('id, nombre, slug, activo')
    .order('orden')
    .order('nombre')

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--a-accent)', marginBottom: '0.4rem' }}>
            Galería
          </p>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '2rem', fontWeight: 400, fontStyle: 'italic', color: 'var(--a-text)' }}>
            Artistas
          </h1>
        </div>
        <Link href="/admin/artistas/nuevo" className="admin-btn">
          + Nuevo artista
        </Link>
      </div>

      <div style={{ background: 'var(--a-surface)', border: '1px solid var(--a-border)' }}>
        {artistas?.length === 0 && (
          <p style={{ padding: '3rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--a-text-muted)', fontStyle: 'italic', fontFamily: 'var(--font-cormorant), serif' }}>
            No hay artistas todavía.
          </p>
        )}
        <ul>
          {artistas?.map((a) => (
            <li
              key={a.id}
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
                <p style={{ fontSize: '0.9rem', color: 'var(--a-text)' }}>{a.nombre}</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--a-text-muted)', marginTop: '3px' }}>/galeria/{a.slug}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                <span
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    border: `1px solid ${a.activo ? 'var(--a-success)' : 'var(--a-border)'}`,
                    color: a.activo ? 'var(--a-success)' : 'var(--a-text-muted)',
                  }}
                >
                  {a.activo ? 'Activo' : 'Oculto'}
                </span>
                <Link
                  href={`/admin/artistas/${a.id}/editar`}
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
                  action={eliminarArtista.bind(null, a.id)}
                  confirm={`¿Eliminar a "${a.nombre}"?`}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
