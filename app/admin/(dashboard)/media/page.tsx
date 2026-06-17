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
      <h1 className="text-2xl font-semibold text-zinc-900 mb-6">Biblioteca de medios</h1>

      <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-6">
        <p className="text-sm font-medium text-zinc-700 mb-3">Subir archivo</p>
        <MediaUploader />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {archivos?.map((a) => (
          <div key={a.id} className="group relative bg-white border border-zinc-200 rounded-xl overflow-hidden">
            {a.tipo === 'image' ? (
              <div className="relative aspect-square">
                <Image src={a.url} alt={a.nombre} fill className="object-cover" sizes="200px" />
              </div>
            ) : (
              <div className="aspect-square bg-zinc-100 flex items-center justify-center">
                <span className="text-2xl">{a.tipo === 'video' ? '🎬' : '📄'}</span>
              </div>
            )}
            <div className="p-2">
              <p className="text-xs text-zinc-600 truncate">{a.nombre}</p>
              <div className="flex items-center justify-between mt-1">
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

      {archivos?.length === 0 && (
        <p className="text-sm text-zinc-400 text-center py-12">No hay archivos subidos todavía.</p>
      )}
    </div>
  )
}
