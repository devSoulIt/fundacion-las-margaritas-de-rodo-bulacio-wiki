import Image from 'next/image'
import { createClient } from '@/app/lib/supabase/server'
import { eliminarArchivo } from '@/app/actions/media'
import MediaUploader from '@/components/admin/MediaUploader'
import CopyUrlButton from '@/components/admin/CopyUrlButton'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function AdminMediaPage() {
  const supabase = await createClient()
  const { data: archivos } = await supabase
    .from('media')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--a-accent)', marginBottom: '0.4rem' }}>
          Archivos
        </p>
        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '2rem', fontWeight: 400, fontStyle: 'italic', color: 'var(--a-text)' }}>
          Biblioteca de medios
        </h1>
      </div>

      <div
        style={{
          background: 'var(--a-surface)',
          border: '1px solid var(--a-border)',
          padding: '1.5rem',
          marginBottom: '1.5rem',
        }}
      >
        <p style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--a-text-muted)', marginBottom: '1rem' }}>
          Subir archivo
        </p>
        <MediaUploader />
      </div>

      {archivos?.length === 0 && (
        <p style={{ padding: '3rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--a-text-muted)', fontStyle: 'italic', fontFamily: 'var(--font-playfair), serif' }}>
          No hay archivos subidos todavía.
        </p>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1px',
          background: 'var(--a-border)',
        }}
      >
        {archivos?.map((a) => (
          <div
            key={a.id}
            style={{ background: 'var(--a-surface)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
          >
            {a.tipo === 'image' ? (
              <div style={{ position: 'relative', aspectRatio: '1', background: 'var(--a-bg)' }}>
                <Image src={a.url} alt={a.nombre} fill className="object-cover" sizes="200px" />
              </div>
            ) : (
              <div
                style={{
                  aspectRatio: '1',
                  background: 'var(--a-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-playfair), serif',
                    fontSize: '2rem',
                    color: 'var(--a-text-muted)',
                    fontStyle: 'italic',
                  }}
                >
                  {a.tipo === 'video' ? 'vid' : 'doc'}
                </span>
              </div>
            )}
            <div style={{ padding: '0.75rem' }}>
              <p style={{ fontSize: '0.72rem', color: 'var(--a-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '0.5rem' }}>
                {a.nombre}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <CopyUrlButton url={a.url} />
                <DeleteButton
                  action={eliminarArchivo.bind(null, a.id, a.url)}
                  confirm="¿Eliminar este archivo?"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
