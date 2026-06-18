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
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*,.pdf"
          style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', opacity: 0 }}
          onChange={handleChange}
          disabled={uploading}
        />
        <span className="admin-btn">
          {uploading ? 'Subiendo…' : 'Seleccionar archivo'}
        </span>
        <span style={{ fontSize: '0.78rem', color: 'var(--a-text-muted)' }}>Imágenes, videos o PDF</span>
      </label>
      {error && (
        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--a-danger)' }}>{error}</p>
      )}
    </div>
  )
}
