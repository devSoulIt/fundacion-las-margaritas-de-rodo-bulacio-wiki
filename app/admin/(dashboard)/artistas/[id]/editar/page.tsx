import { notFound } from 'next/navigation'
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
      <h1 className="text-2xl font-semibold text-zinc-900 mb-6">Editar: {artista.nombre}</h1>
      <div className="bg-white border border-zinc-200 rounded-xl p-6">
        <ArtistaForm action={action} artista={artista} />
      </div>
    </div>
  )
}
