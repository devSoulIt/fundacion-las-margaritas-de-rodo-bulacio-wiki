'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef } from 'react'

const NAV_ITEMS = [
  { label: 'Rodolfo Bulacio', href: '/wiki/rodolfo-bulacio' },
  { label: 'Fundación', href: '/wiki/fundacion-las-margaritas' },
  { label: 'Sala de Arte', href: '/wiki/sala-de-arte' },
  { label: 'Galería de Artistas', href: '/galeria' },
  { label: 'Archivo y Memoria', href: '/wiki/archivo-y-memoria' },
  { label: 'Contacto', href: '/contacto' },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  if (pathname.startsWith('/admin')) return null

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = searchRef.current?.value.trim()
    if (!q) return
    setSearchOpen(false)
    router.push(`/buscar?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16 gap-4">
        <Link href="/" className="font-semibold text-lg tracking-tight text-zinc-900 hover:text-zinc-600 transition-colors shrink-0">
          Las Margaritas
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-zinc-100 text-zinc-900 font-medium'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop search */}
        <div className="hidden md:block">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                ref={searchRef}
                autoFocus
                type="search"
                placeholder="Buscar…"
                className="border border-zinc-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 w-48"
                onBlur={() => setSearchOpen(false)}
              />
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              aria-label="Buscar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 rounded-md text-zinc-600 hover:bg-zinc-100"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-zinc-100 px-4 py-3 flex flex-col gap-1 bg-white">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  active
                    ? 'bg-zinc-100 text-zinc-900 font-medium'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <form onSubmit={handleSearch} className="mt-2 flex gap-2">
            <input
              ref={searchRef}
              type="search"
              placeholder="Buscar…"
              className="flex-1 border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
            <button
              type="submit"
              className="bg-zinc-900 text-white rounded-lg px-3 py-2 text-sm"
            >
              Ir
            </button>
          </form>
        </nav>
      )}
    </header>
  )
}
