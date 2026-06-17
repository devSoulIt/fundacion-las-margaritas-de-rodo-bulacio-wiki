'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from '@/app/actions/auth'

const LINKS = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Páginas', href: '/admin/paginas' },
  { label: 'Artistas', href: '/admin/artistas' },
  { label: 'Media', href: '/admin/media' },
  { label: 'Configuración', href: '/admin/configuracion' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 bg-white border-r border-zinc-200 flex flex-col">
      <div className="px-4 py-5 border-b border-zinc-100">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Admin</p>
        <p className="text-sm font-medium text-zinc-900 mt-0.5">Las Margaritas</p>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {LINKS.map((link) => {
          const active =
            link.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-md text-sm transition-colors ${
                active
                  ? 'bg-zinc-100 text-zinc-900 font-medium'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-zinc-100">
        <form action={signOut}>
          <button
            type="submit"
            className="w-full px-3 py-2 rounded-md text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors text-left"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  )
}
