'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import RichEditor from '@/components/editor/RichEditorClient'
import { slugify } from '@/app/lib/utils'

interface Artista {
  id: string
  nombre: string
}

interface Obra {
  id: string
  titulo: string
  slug: string
  artista_id: string
  imagen: string | null
  descripcion: string | null
  activa: boolean
}

interface Props {
  action: (prevState: { error: string } | null, formData: FormData) => Promise<{ error: string }>
  artistas: Artista[]
  obra?: Obra
}

export default function ObraForm({ action, artistas, obra }: Props) {
  const [state, formAction, pending] = useActionState(action, null)

  return (
    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <div>
          <label className="admin-label">Título *</label>
          <input
            name="titulo"
            required
            defaultValue={obra?.titulo}
            className="admin-input"
            onChange={(e) => {
              const slugInput = document.getElementById('obra-slug') as HTMLInputElement
              if (slugInput && !obra) slugInput.value = slugify(e.target.value)
            }}
          />
        </div>
        <div>
          <label className="admin-label">Slug</label>
          <input
            id="obra-slug"
            name="slug"
            defaultValue={obra?.slug}
            className="admin-input"
            style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
          />
        </div>
      </div>

      <div>
        <label className="admin-label">Artista *</label>
        <select
          name="artista_id"
          required
          defaultValue={obra?.artista_id ?? ''}
          className="admin-input"
          style={{ cursor: 'pointer' }}
        >
          <option value="" disabled>Seleccionar artista…</option>
          {artistas.map((a) => (
            <option key={a.id} value={a.id}>{a.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="admin-label">Imagen (URL)</label>
        <input
          name="imagen"
          defaultValue={obra?.imagen ?? ''}
          className="admin-input"
          placeholder="https://…"
        />
      </div>

      <div>
        <label className="admin-label" style={{ marginBottom: '8px' }}>Descripción / Texto de la obra</label>
        <RichEditor name="descripcion" defaultValue={obra?.descripcion ?? ''} placeholder="Descripción de la obra…" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <input
          type="checkbox"
          id="activa"
          name="activa"
          value="true"
          defaultChecked={obra?.activa ?? true}
          style={{ width: '16px', height: '16px', accentColor: 'var(--a-accent)', cursor: 'pointer' }}
        />
        <label htmlFor="activa" style={{ fontSize: '0.8rem', color: 'var(--a-text-muted)', cursor: 'pointer' }}>
          Visible públicamente
        </label>
      </div>

      {state?.error && (
        <p style={{ fontSize: '0.8rem', color: 'var(--a-danger)', padding: '8px 12px', background: 'rgba(192,80,58,0.1)', border: '1px solid rgba(192,80,58,0.3)' }}>
          {state.error}
        </p>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
        <button type="submit" disabled={pending} className="admin-btn">
          {pending ? 'Guardando…' : obra ? 'Guardar cambios' : 'Crear obra'}
        </button>
        <Link href="/admin/obras" className="admin-btn-ghost">
          Cancelar
        </Link>
      </div>
    </form>
  )
}
