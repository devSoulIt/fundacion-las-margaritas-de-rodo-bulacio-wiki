'use client'

import { useState, useRef } from 'react'
import { subirArchivo } from '@/app/actions/media'
import { useRouter } from 'next/navigation'

export default function MediaUploader() {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    const fd = new FormData()
    fd.append('archivo', file)
    fd.append('carpeta', 'imagenes')

    const { error } = await subirArchivo(fd)
    setUploading(false)

    if (error) {
      setError(error)
    } else {
      router.refresh()
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div>
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*,.pdf"
          className="sr-only"
          onChange={handleChange}
          disabled={uploading}
        />
        <span className="inline-flex items-center gap-2 bg-zinc-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-zinc-700 transition-colors">
          {uploading ? 'Subiendo…' : 'Seleccionar archivo'}
        </span>
        <span className="text-sm text-zinc-400">Imágenes, videos o PDF</span>
      </label>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}
