import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/app/lib/supabase/server'
import { actualizarArtista } from '@/app/actions/artistas'
import ArtistaForm from '@/components/admin/ArtistaForm'

export default async function EditarArtistaPage(props: PageProps<'/admin/artistas/[id]/editar'>) {
  const { id } = await props.params
  const supabase = await createClient()

  const { data: artista } = await supabase
    .from('artistas')
    .select('*')
    .eq('id', id)
    .single()

  if (!artista) notFound()

  const action = actualizarArtista.bind(null, id)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--a-accent)', marginBottom: '0.4rem' }}>
            Editando artista
          </p>
          <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '2rem', fontWeight: 400, fontStyle: 'italic', color: 'var(--a-text)' }}>
            {artista.nombre}
          </h1>
        </div>
        <Link href="/admin/artistas" className="admin-btn-ghost">← Volver</Link>
      </div>
      <ArtistaForm action={action} artista={artista} />
    </div>
  )
}
