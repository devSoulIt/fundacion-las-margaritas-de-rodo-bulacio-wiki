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
      className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors"
    >
      {copied ? '¡Copiado!' : 'Copiar URL'}
    </button>
  )
}
