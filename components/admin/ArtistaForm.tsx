'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import RichEditor from '@/components/editor/RichEditorClient'
import { slugify } from '@/app/lib/utils'

interface Artista {
  id: string
  nombre: string
  slug: string
  foto: string | null
  biografia: string | null
  statement: string | null
  trayectoria: string | null
  activo: boolean
}

interface Props {
  action: (prevState: { error: string } | null, formData: FormData) => Promise<{ error: string }>
  artista?: Artista
}

export default function ArtistaForm({ action, artista }: Props) {
  const [state, formAction, pending] = useActionState(action, null)

  return (
    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <div>
          <label className="admin-label">Nombre *</label>
          <input
            name="nombre"
            required
            defaultValue={artista?.nombre}
            className="admin-input"
            onChange={(e) => {
              const slugInput = document.getElementById('artista-slug') as HTMLInputElement
              if (slugInput && !artista) slugInput.value = slugify(e.target.value)
            }}
          />
        </div>
        <div>
          <label className="admin-label">Slug</label>
          <input
            id="artista-slug"
            name="slug"
            defaultValue={artista?.slug}
            className="admin-input"
            style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
          />
        </div>
      </div>

      <div>
        <label className="admin-label">Foto (URL)</label>
        <input
          name="foto"
          defaultValue={artista?.foto ?? ''}
          className="admin-input"
          placeholder="https://…"
        />
      </div>

      <div>
        <label className="admin-label">Statement / Texto curatorial</label>
        <textarea
          name="statement"
          rows={3}
          defaultValue={artista?.statement ?? ''}
          className="admin-input"
          style={{ resize: 'none', fontFamily: 'var(--font-dm-sans), sans-serif' }}
        />
      </div>

      <div>
        <label className="admin-label" style={{ marginBottom: '8px' }}>Biografía</label>
        <RichEditor name="biografia" defaultValue={artista?.biografia ?? ''} placeholder="Biografía del artista…" />
      </div>

      <div>
        <label className="admin-label" style={{ marginBottom: '8px' }}>Trayectoria y antecedentes</label>
        <RichEditor name="trayectoria" defaultValue={artista?.trayectoria ?? ''} placeholder="Recorrido artístico…" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <input
          type="checkbox"
          id="activo"
          name="activo"
          value="true"
          defaultChecked={artista?.activo ?? true}
          style={{ width: '16px', height: '16px', accentColor: 'var(--a-accent)', cursor: 'pointer' }}
        />
        <label htmlFor="activo" style={{ fontSize: '0.8rem', color: 'var(--a-text-muted)', cursor: 'pointer' }}>
          Visible en la galería pública
        </label>
      </div>

      {state?.error && (
        <p style={{ fontSize: '0.8rem', color: 'var(--a-danger)', padding: '8px 12px', background: 'rgba(192,80,58,0.1)', border: '1px solid rgba(192,80,58,0.3)' }}>
          {state.error}
        </p>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
        <button type="submit" disabled={pending} className="admin-btn">
          {pending ? 'Guardando…' : artista ? 'Guardar cambios' : 'Crear artista'}
        </button>
        <Link href="/admin/artistas" className="admin-btn-ghost">
          Cancelar
        </Link>
      </div>
    </form>
  )
}
