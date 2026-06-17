import PageForm from '@/components/admin/PageForm'
import { crearPagina } from '@/app/actions/paginas'

export default function NuevaPaginaPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900 mb-6">Nueva página</h1>
      <div className="bg-white border border-zinc-200 rounded-xl p-6">
        <PageForm action={crearPagina} />
      </div>
    </div>
  )
}
