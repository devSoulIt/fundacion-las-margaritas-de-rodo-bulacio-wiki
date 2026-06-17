import Link from 'next/link'
import { createClient } from '@/app/lib/supabase/server'
import SearchBar from '@/components/ui/SearchBar'

export const metadata = {
  title: 'Buscar — Fundación Las Margaritas',
}

export default async function BuscarPage(props: PageProps<'/buscar'>) {
  const { q } = await props.searchParams as { q?: string }
  const query = q?.trim() ?? ''

  const supabase = await createClient()

  const [{ data: paginas }, { data: artistas }] = await Promise.all([
    query
      ? supabase
          .from('paginas')
          .select('titulo, slug, resumen')
          .eq('publicada', true)
          .or(`titulo.ilike.%${query}%,resumen.ilike.%${query}%,contenido.ilike.%${query}%`)
          .order('titulo')
          .limit(20)
      : { data: [] },
    query
      ? supabase
          .from('artistas')
          .select('nombre, slug, statement')
          .eq('activo', true)
          .or(`nombre.ilike.%${query}%,statement.ilike.%${query}%,biografia.ilike.%${query}%`)
          .order('nombre')
          .limit(10)
      : { data: [] },
  ])

  const total = (paginas?.length ?? 0) + (artistas?.length ?? 0)

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold text-zinc-900 mb-6">Buscar</h1>

      <SearchBar defaultValue={query} />

      {query && (
        <div className="mt-8">
          <p className="text-sm text-zinc-400 mb-6">
            {total === 0
              ? `Sin resultados para "${query}"`
              : `${total} resultado${total !== 1 ? 's' : ''} para "${query}"`}
          </p>

          {paginas && paginas.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Páginas</h2>
              <ul className="divide-y divide-zinc-100 border border-zinc-200 rounded-xl overflow-hidden">
                {paginas.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/wiki/${p.slug}`}
                      className="flex flex-col px-5 py-4 hover:bg-zinc-50 transition-colors"
                    >
                      <span className="text-sm font-medium text-zinc-900">{p.titulo}</span>
                      {p.resumen && (
                        <span className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{p.resumen}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {artistas && artistas.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Artistas</h2>
              <ul className="divide-y divide-zinc-100 border border-zinc-200 rounded-xl overflow-hidden">
                {artistas.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/galeria/${a.slug}`}
                      className="flex flex-col px-5 py-4 hover:bg-zinc-50 transition-colors"
                    >
                      <span className="text-sm font-medium text-zinc-900">{a.nombre}</span>
                      {a.statement && (
                        <span className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{a.statement}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {!query && (
        <p className="mt-8 text-sm text-zinc-400">Escribí un término para buscar en páginas y artistas.</p>
      )}
    </div>
  )
}
