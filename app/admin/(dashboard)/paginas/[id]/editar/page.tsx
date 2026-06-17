import { notFound } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/server'
import { actualizarPagina } from '@/app/actions/paginas'
import PageForm from '@/components/admin/PageForm'

export default async function EditarPaginaPage(props: PageProps<'/admin/paginas/[id]/editar'>) {
  const { id } = await props.params
  const supabase = await createClient()

  const { data: pagina } = await supabase
    .from('paginas')
    .select('*')
    .eq('id', id)
    .single()

  if (!pagina) notFound()

  const action = actualizarPagina.bind(null, id)

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900 mb-6">Editar: {pagina.titulo}</h1>
      <div className="bg-white border border-zinc-200 rounded-xl p-6">
        <PageForm action={action} pagina={pagina} />
      </div>
    </div>
  )
}
