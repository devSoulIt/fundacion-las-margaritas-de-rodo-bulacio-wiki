import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/app/lib/supabase/server'
import WikiPage from '@/components/wiki/WikiPage'

export async function generateMetadata(props: PageProps<'/galeria/[slug]'>) {
  const { slug } = await props.params
  const supabase = await createClient()
  const { data } = await supabase.from('artistas').select('nombre, statement').eq('slug', slug).single()

  return {
    title: data ? `${data.nombre} — Galería de Artistas` : 'Artista no encontrado',
    description: data?.statement ?? '',
  }
}

export default async function ArtistaPage(props: PageProps<'/galeria/[slug]'>) {
  const { slug } = await props.params
  const supabase = await createClient()

  const { data: artista } = await supabase
    .from('artistas')
    .select('*')
    .eq('slug', slug)
    .eq('activo', true)
    .single()

  if (!artista) notFound()

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/galeria" className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors mb-6 inline-block">
        ← Galería de artistas
      </Link>

      <div className="flex flex-col sm:flex-row gap-8 mb-10">
        {artista.foto && (
          <div className="relative w-40 h-40 shrink-0 rounded-xl overflow-hidden bg-zinc-100">
            <Image
              src={artista.foto}
              alt={artista.nombre}
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">{artista.nombre}</h1>
          {artista.statement && (
            <p className="text-zinc-500 italic leading-relaxed">{artista.statement}</p>
          )}
        </div>
      </div>

      {artista.biografia && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Biografía</h2>
          <WikiPage contenido={artista.biografia} />
        </section>
      )}

      {artista.trayectoria && (
        <section>
          <h2 className="text-lg font-semibold text-zinc-900 mb-4">Trayectoria</h2>
          <WikiPage contenido={artista.trayectoria} />
        </section>
      )}
    </article>
  )
}
