'use client'

import { useRouter } from 'next/navigation'
import { useRef } from 'react'

export default function SearchBar({ defaultValue = '' }: { defaultValue?: string }) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = inputRef.current?.value.trim()
    if (!q) return
    router.push(`/buscar?q=${encodeURIComponent(q)}`)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0' }}>
      <input
        ref={inputRef}
        type="search"
        defaultValue={defaultValue}
        placeholder="Buscar páginas y artistas…"
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
          color: 'var(--white)',
          fontSize: '0.95rem',
          padding: '10px 0',
          outline: 'none',
          letterSpacing: '0.02em',
        }}
      />
      <button
        type="submit"
        style={{
          background: 'var(--accent)',
          color: 'var(--white)',
          border: 'none',
          cursor: 'pointer',
          padding: '10px 24px',
          fontSize: '0.68rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontWeight: 500,
          transition: 'background 0.2s',
          flexShrink: 0,
          marginLeft: '1rem',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-dark)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
      >
        Buscar
      </button>
    </form>
  )
}
