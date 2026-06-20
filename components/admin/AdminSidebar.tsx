'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from '@/app/actions/auth'

const LINKS = [
  { label: 'Dashboard', href: '/admin', icon: '▪' },
  { label: 'Páginas', href: '/admin/paginas', icon: '▪' },
  { label: 'Artistas', href: '/admin/artistas', icon: '▪' },
  { label: 'Media', href: '/admin/media', icon: '▪' },
  { label: 'Configuración', href: '/admin/configuracion', icon: '▪' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside
      style={{
        width: '220px',
        flexShrink: 0,
        background: 'var(--a-surface)',
        borderRight: '1px solid var(--a-border)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '1.5rem 1.25rem 1.25rem',
          borderBottom: '1px solid var(--a-border)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: '1.1rem',
            fontStyle: 'italic',
            fontWeight: 700,
            color: 'var(--a-text)',
            marginBottom: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <span style={{ color: 'var(--a-accent)', fontSize: '0.9rem' }}>✿</span>
          Las Margaritas
        </p>
        <p
          style={{
            fontSize: '0.62rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--a-text-muted)',
          }}
        >
          Panel de administración
        </p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {LINKS.map((link) => {
          const active =
            link.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                fontSize: '0.8rem',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                color: active ? 'var(--a-text)' : 'var(--a-text-muted)',
                background: active ? 'rgba(245,197,0,0.15)' : 'transparent',
                borderLeft: active ? '2px solid var(--a-accent)' : '2px solid transparent',
                fontWeight: active ? 600 : 400,
                transition: 'color 0.15s, background 0.15s',
              }}
              onMouseEnter={e => {
                if (!active) {
                  e.currentTarget.style.color = 'var(--a-text)'
                  e.currentTarget.style.background = 'rgba(91,184,232,0.1)'
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  e.currentTarget.style.color = 'var(--a-text-muted)'
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Sign out */}
      <div style={{ padding: '0.75rem', borderTop: '1px solid var(--a-border)' }}>
        <form action={signOut}>
          <button
            type="submit"
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 12px',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--a-text-muted)',
              textAlign: 'left',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--a-danger)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--a-text-muted)')}
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  )
}
