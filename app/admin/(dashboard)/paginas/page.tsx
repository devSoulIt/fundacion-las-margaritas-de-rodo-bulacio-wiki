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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-zinc-900">Páginas</h1>
        <Link
          href="/admin/paginas/nueva"
          className="bg-zinc-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-zinc-700 transition-colors"
        >
          + Nueva página
        </Link>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        {paginas?.length === 0 && (
          <p className="px-5 py-8 text-sm text-zinc-400 text-center">No hay páginas todavía.</p>
        )}
        <ul className="divide-y divide-zinc-100">
          {paginas?.map((p) => (
            <li key={p.id} className="px-5 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-zinc-900 truncate">{p.titulo}</p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  /wiki/{p.slug} · {p.seccion ?? 'sin sección'} · {formatDate(p.updated_at)}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <form action={togglePublicada.bind(null, p.id, p.publicada)}>
                  <button
                    type="submit"
                    className={`text-xs px-2 py-1 rounded-full border transition-colors ${
                      p.publicada
                        ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                        : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    {p.publicada ? 'Publicada' : 'Borrador'}
                  </button>
                </form>
                <Link
                  href={`/admin/paginas/${p.id}/editar`}
                  className="text-xs text-zinc-500 hover:text-zinc-900 px-2 py-1 rounded hover:bg-zinc-100 transition-colors"
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
