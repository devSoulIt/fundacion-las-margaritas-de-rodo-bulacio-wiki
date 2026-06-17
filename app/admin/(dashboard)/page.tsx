import Link from 'next/link'
import { createClient } from '@/app/lib/supabase/server'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [{ count: totalPaginas }, { count: totalArtistas }, { count: totalMedia }] =
    await Promise.all([
      supabase.from('paginas').select('*', { count: 'exact', head: true }),
      supabase.from('artistas').select('*', { count: 'exact', head: true }),
      supabase.from('media').select('*', { count: 'exact', head: true }),
    ])

  const { data: ultimasPaginas } = await supabase
    .from('paginas')
    .select('id, titulo, slug, publicada, updated_at')
    .order('updated_at', { ascending: false })
    .limit(5)

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Páginas', count: totalPaginas ?? 0, href: '/admin/paginas' },
          { label: 'Artistas', count: totalArtistas ?? 0, href: '/admin/artistas' },
          { label: 'Archivos', count: totalMedia ?? 0, href: '/admin/media' },
        ].map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="bg-white border border-zinc-200 rounded-xl p-5 hover:border-zinc-300 transition-colors"
          >
            <p className="text-3xl font-bold text-zinc-900">{stat.count}</p>
            <p className="text-sm text-zinc-500 mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl">
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
          <h2 className="text-sm font-medium text-zinc-900">Páginas recientes</h2>
          <Link href="/admin/paginas/nueva" className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors">
            + Nueva
          </Link>
        </div>
        <ul className="divide-y divide-zinc-100">
          {ultimasPaginas?.map((p) => (
            <li key={p.id} className="px-5 py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-900">{p.titulo}</p>
                <p className="text-xs text-zinc-400">/wiki/{p.slug}</p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    p.publicada ? 'bg-green-400' : 'bg-zinc-300'
                  }`}
                  title={p.publicada ? 'Publicada' : 'Borrador'}
                />
                <Link
                  href={`/admin/paginas/${p.id}/editar`}
                  className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  Editar
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
