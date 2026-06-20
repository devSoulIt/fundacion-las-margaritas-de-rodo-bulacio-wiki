'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { createClient } from '@/app/lib/supabase/browser'

interface MediaItem {
  id: string
  nombre: string
  url: string
  tipo: string
}

interface Props {
  onSelect: (url: string) => void
  onClose: () => void
}

export default function MediaPicker({ onSelect, onClose }: Props) {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'image' | 'document'>('all')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('media')
        .select('id, nombre, url, tipo')
        .order('created_at', { ascending: false })
      setItems(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = filter === 'all' ? items : items.filter(i => i.tipo === filter)

  return (
    /* Backdrop */
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Panel */}
      <div
        style={{
          background: 'var(--a-surface)',
          border: '1px solid var(--a-border)',
          width: '100%',
          maxWidth: '820px',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--a-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--a-accent)' }}>
              Biblioteca de medios
            </p>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.1em', color: 'var(--a-text-muted)', marginTop: '2px' }}>
              Seleccioná un archivo para insertar
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid var(--a-border)',
              color: 'var(--a-text-muted)',
              cursor: 'pointer',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              transition: 'color 0.15s',
            }}
          >
            ✕
          </button>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid var(--a-border)', padding: '0 1.25rem' }}>
          {(['all', 'image', 'document'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: filter === f ? '2px solid var(--a-accent)' : '2px solid transparent',
                color: filter === f ? 'var(--a-accent)' : 'var(--a-text-muted)',
                cursor: 'pointer',
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '10px 16px',
                transition: 'color 0.15s',
              }}
            >
              {f === 'all' ? 'Todos' : f === 'image' ? 'Imágenes' : 'Documentos'}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.25rem' }}>
          {loading && (
            <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--a-text-muted)', fontSize: '0.85rem', fontStyle: 'italic', fontFamily: 'var(--font-playfair), serif' }}>
              Cargando archivos…
            </p>
          )}

          {!loading && filtered.length === 0 && (
            <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--a-text-muted)', fontSize: '0.85rem', fontStyle: 'italic', fontFamily: 'var(--font-playfair), serif' }}>
              No hay archivos en esta categoría.
            </p>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
              gap: '1px',
              background: 'var(--a-border)',
            }}
          >
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => { onSelect(item.url); onClose() }}
                title={item.nombre}
                style={{
                  background: 'var(--a-bg)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'left',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(245,197,0,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--a-bg)')}
              >
                {item.tipo === 'image' ? (
                  <div style={{ position: 'relative', aspectRatio: '1', width: '100%' }}>
                    <Image src={item.url} alt={item.nombre} fill className="object-cover" sizes="140px" />
                  </div>
                ) : (
                  <div
                    style={{
                      aspectRatio: '1',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.5rem', color: 'var(--a-text-muted)', fontStyle: 'italic' }}>
                      {item.tipo === 'video' ? 'vid' : 'doc'}
                    </span>
                  </div>
                )}
                <p
                  style={{
                    fontSize: '0.62rem',
                    color: 'var(--a-text-muted)',
                    padding: '4px 8px 6px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%',
                  }}
                >
                  {item.nombre}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
