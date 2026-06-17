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
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        ref={inputRef}
        type="search"
        defaultValue={defaultValue}
        placeholder="Buscar páginas y artistas…"
        className="flex-1 border border-zinc-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
      />
      <button
        type="submit"
        className="bg-zinc-900 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-zinc-700 transition-colors"
      >
        Buscar
      </button>
    </form>
  )
}
