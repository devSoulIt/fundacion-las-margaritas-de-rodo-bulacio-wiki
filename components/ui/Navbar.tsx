'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef } from 'react'

const NAV_ITEMS = [
  { label: 'Rodolfo Bulacio', href: '/wiki/rodolfo-bulacio' },
  { label: 'Fundación', href: '/wiki/fundacion-las-margaritas' },
  { label: 'Sala de Arte', href: '/wiki/sala-de-arte-contemporaneo-rodolfo-bulacio' },
  { label: 'Artistas', href: '/galeria' },
  //{ label: 'Obras', href: '/obras' },
  //{ label: 'Archivo', href: '/wiki/archivo-y-memoria' },
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
    setOpen(false)
    router.push(`/buscar?q=${encodeURIComponent(q)}`)
  }

  return (
    <header
      className="sticky top-0 z-50"
      style={{ background: 'var(--bg-dark)', borderBottom: '3px solid var(--accent)' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 gap-6">
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: '1.2rem',
            fontStyle: 'italic',
            fontWeight: 700,
            color: 'var(--accent)',
            letterSpacing: '0.01em',
            flexShrink: 0,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          <Image src="/logo.png" alt="Las Margaritas" width={140} height={50} style={{ objectFit: 'contain' }} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0 flex-1 justify-center">
          {NAV_ITEMS.map((item, i) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <span key={item.href} className="flex items-center">
                {i > 0 && (
                  <span style={{ width: '1px', height: '12px', background: 'var(--accent-celeste)', opacity: 0.4, margin: '0 2px', display: 'inline-block' }} />
                )}
                <Link
                  href={item.href}
                  style={{
                    padding: '4px 11px',
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: active ? 'var(--accent)' : 'var(--white)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    fontWeight: active ? 700 : 400,
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--accent)' }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--white)' }}
                >
                  {item.label}
                </Link>
              </span>
            )
          })}
        </nav>

        {/* Desktop search */}
        <div className="hidden md:flex items-center gap-3" style={{ flexShrink: 0 }}>
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                ref={searchRef}
                autoFocus
                type="search"
                placeholder="Buscar…"
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '2px solid var(--accent)',
                  color: 'var(--white)',
                  fontSize: '0.8rem',
                  padding: '4px 0',
                  outline: 'none',
                  width: '160px',
                  letterSpacing: '0.04em',
                }}
                onBlur={() => setSearchOpen(false)}
              />
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--white)', padding: '4px', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--white)')}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--white)', padding: '6px' }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeWidth={1.5} d="M4 4l14 14M18 4L4 18" />
            ) : (
              <path strokeLinecap="round" strokeWidth={1.5} d="M3 6h16M3 11h16M3 16h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          className="md:hidden px-6 py-5 flex flex-col gap-1"
          style={{ borderTop: '1px solid var(--border-dark)', background: 'var(--bg-dark)' }}
        >
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  padding: '10px 0',
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: active ? 'var(--accent)' : 'var(--white)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--border-dark)',
                  display: 'block',
                }}
              >
                {item.label}
              </Link>
            )
          })}
          <form onSubmit={handleSearch} className="mt-4 flex gap-2">
            <input
              ref={searchRef}
              type="search"
              placeholder="Buscar…"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                borderBottom: '2px solid var(--accent)',
                color: 'var(--white)',
                fontSize: '0.8rem',
                padding: '6px 0',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                background: 'var(--accent)',
                color: 'var(--text)',
                border: 'none',
                cursor: 'pointer',
                padding: '6px 14px',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              Ir
            </button>
          </form>
        </nav>
      )}
    </header>
  )
}
