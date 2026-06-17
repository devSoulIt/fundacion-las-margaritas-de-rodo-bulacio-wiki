import ArtistaForm from '@/components/admin/ArtistaForm'
import { crearArtista } from '@/app/actions/artistas'

export default function NuevoArtistaPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900 mb-6">Nuevo artista</h1>
      <div className="bg-white border border-zinc-200 rounded-xl p-6">
        <ArtistaForm action={crearArtista} />
      </div>
    </div>
  )
}
