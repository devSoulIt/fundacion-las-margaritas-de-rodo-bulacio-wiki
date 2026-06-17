import { notFound } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/app/lib/supabase/server'
import WikiPage from '@/components/wiki/WikiPage'
import { formatDate } from '@/app/lib/utils'

export async function generateMetadata(props: PageProps<'/wiki/[slug]'>) {
  const { slug } = await props.params
  const supabase = await createClient()
  const { data } = await supabase.from('paginas').select('titulo, resumen').eq('slug', slug).single()

  return {
    title: data ? `${data.titulo} — Fundación Las Margaritas` : 'Página no encontrada',
    description: data?.resumen ?? '',
  }
}

export default async function WikiPageRoute(props: PageProps<'/wiki/[slug]'>) {
  const { slug } = await props.params
  const supabase = await createClient()

  const { data: pagina } = await supabase
    .from('paginas')
    .select('*')
    .eq('slug', slug)
    .eq('publicada', true)
    .single()

  if (!pagina) notFound()

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {pagina.imagen_portada && (
        <div className="relative w-full aspect-[16/6] rounded-xl overflow-hidden mb-8">
          <Image
            src={pagina.imagen_portada}
            alt={pagina.titulo}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 leading-tight mb-3">
          {pagina.titulo}
        </h1>
        {pagina.resumen && (
          <p className="text-lg text-zinc-500 leading-relaxed">{pagina.resumen}</p>
        )}
        <p className="text-xs text-zinc-400 mt-3">
          Actualizado: {formatDate(pagina.updated_at)}
        </p>
      </header>

      {pagina.contenido && <WikiPage contenido={pagina.contenido} />}
    </article>
  )
}
