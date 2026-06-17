import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/app/lib/supabase/server'

export const metadata = {
  title: 'Galería de Artistas — Fundación Las Margaritas',
  description: 'Artistas que forman parte de la propuesta expositiva de la Fundación Las Margaritas de Rodolfo Bulacio.',
}

export default async function GaleriaPage() {
  const supabase = await createClient()
  const { data: artistas } = await supabase
    .from('artistas')
    .select('id, nombre, slug, foto, statement')
    .eq('activo', true)
    .order('orden')
    .order('nombre')

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Galería de Artistas</h1>
        <p className="text-zinc-500 max-w-xl">
          Artistas que forman parte de la propuesta expositiva presentada por la Fundación Las Margaritas de Rodolfo Bulacio y la Sala de Arte Contemporáneo Rodolfo Bulacio.
        </p>
      </header>

      {artistas?.length === 0 && (
        <p className="text-zinc-400 text-center py-20">En construcción — próximamente se incorporarán los perfiles de artistas.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {artistas?.map((a) => (
          <Link
            key={a.id}
            href={`/galeria/${a.slug}`}
            className="group bg-white border border-zinc-200 rounded-xl overflow-hidden hover:border-zinc-400 hover:shadow-sm transition-all"
          >
            <div className="relative aspect-square bg-zinc-100">
              {a.foto ? (
                <Image
                  src={a.foto}
                  alt={a.nombre}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-300 text-5xl">
                  🎨
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-zinc-900">{a.nombre}</h2>
              {a.statement && (
                <p className="text-sm text-zinc-500 mt-1 line-clamp-2">{a.statement}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
