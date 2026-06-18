'use client'

import { useState } from 'react'

export default function CopyUrlButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.68rem',
        letterSpacing: '0.06em',
        color: copied ? 'var(--a-success)' : 'var(--a-text-muted)',
        transition: 'color 0.15s',
        padding: 0,
      }}
      onMouseEnter={e => { if (!copied) e.currentTarget.style.color = 'var(--a-accent)' }}
      onMouseLeave={e => { if (!copied) e.currentTarget.style.color = 'var(--a-text-muted)' }}
    >
      {copied ? '✓ Copiado' : 'Copiar URL'}
    </button>
  )
}
