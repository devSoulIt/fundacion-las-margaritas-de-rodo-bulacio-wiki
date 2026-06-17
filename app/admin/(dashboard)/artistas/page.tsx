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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-zinc-900">Artistas</h1>
        <Link
          href="/admin/artistas/nuevo"
          className="bg-zinc-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-zinc-700 transition-colors"
        >
          + Nuevo artista
        </Link>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        {artistas?.length === 0 && (
          <p className="px-5 py-8 text-sm text-zinc-400 text-center">No hay artistas todavía.</p>
        )}
        <ul className="divide-y divide-zinc-100">
          {artistas?.map((a) => (
            <li key={a.id} className="px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-zinc-900">{a.nombre}</p>
                <p className="text-xs text-zinc-400">/galeria/{a.slug}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs px-2 py-1 rounded-full border ${
                  a.activo ? 'bg-green-50 text-green-700 border-green-200' : 'bg-zinc-50 text-zinc-500 border-zinc-200'
                }`}>
                  {a.activo ? 'Activo' : 'Oculto'}
                </span>
                <Link
                  href={`/admin/artistas/${a.id}/editar`}
                  className="text-xs text-zinc-500 hover:text-zinc-900 px-2 py-1 rounded hover:bg-zinc-100 transition-colors"
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
