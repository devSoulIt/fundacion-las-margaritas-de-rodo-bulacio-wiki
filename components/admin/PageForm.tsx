'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import RichEditor from '@/components/editor/RichEditorClient'
import { slugify } from '@/app/lib/utils'

interface Pagina {
  id: string
  titulo: string
  slug: string
  contenido: string | null
  resumen: string | null
  imagen_portada: string | null
  seccion: string | null
  publicada: boolean
}

const SECCIONES = [
  { value: 'rodolfo-bulacio', label: 'Rodolfo Bulacio' },
  { value: 'fundacion', label: 'Fundación' },
  { value: 'sala-de-arte-contemporaneo-rodolfo-bulacio', label: 'Sala de Arte' },
  { value: 'archivo-y-memoria', label: 'Archivo y Memoria' },
  { value: '', label: 'Sin sección' },
]

interface Props {
  action: (prevState: { error: string } | null, formData: FormData) => Promise<{ error: string }>
  pagina?: Pagina
}

export default function PageForm({ action, pagina }: Props) {
  const [state, formAction, pending] = useActionState(action, null)

  return (
    <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <div>
          <label className="admin-label">Título *</label>
          <input
            name="titulo"
            required
            defaultValue={pagina?.titulo}
            className="admin-input"
            onChange={(e) => {
              const slugInput = document.getElementById('slug-input') as HTMLInputElement
              if (slugInput && !pagina) slugInput.value = slugify(e.target.value)
            }}
          />
        </div>
        <div>
          <label className="admin-label">Slug (URL)</label>
          <input
            id="slug-input"
            name="slug"
            defaultValue={pagina?.slug}
            className="admin-input"
            placeholder="se-genera-automatico"
            style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
          />
        </div>
      </div>

      <div>
        <label className="admin-label">Resumen (SEO y cards)</label>
        <textarea
          name="resumen"
          rows={2}
          defaultValue={pagina?.resumen ?? ''}
          className="admin-input"
          style={{ resize: 'none', fontFamily: 'var(--font-dm-sans), sans-serif' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <div>
          <label className="admin-label">Sección del menú</label>
          <select
            name="seccion"
            defaultValue={pagina?.seccion ?? ''}
            className="admin-input"
            style={{ cursor: 'pointer' }}
          >
            {SECCIONES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="admin-label">Imagen de portada (URL)</label>
          <input
            name="imagen_portada"
            defaultValue={pagina?.imagen_portada ?? ''}
            className="admin-input"
            placeholder="https://…"
          />
        </div>
      </div>

      <div>
        <label className="admin-label" style={{ marginBottom: '8px' }}>Contenido</label>
        <RichEditor
          name="contenido"
          defaultValue={pagina?.contenido ?? ''}
          placeholder="Escribí el contenido de la página…"
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <input
          type="checkbox"
          id="publicada"
          name="publicada"
          value="true"
          defaultChecked={pagina?.publicada}
          style={{ width: '16px', height: '16px', accentColor: 'var(--a-accent)', cursor: 'pointer' }}
        />
        <label htmlFor="publicada" style={{ fontSize: '0.8rem', color: 'var(--a-text-muted)', cursor: 'pointer' }}>
          Publicar (visible en el sitio)
        </label>
      </div>

      {state?.error && (
        <p style={{ fontSize: '0.8rem', color: 'var(--a-danger)', padding: '8px 12px', background: 'rgba(192,80,58,0.1)', border: '1px solid rgba(192,80,58,0.3)' }}>
          {state.error}
        </p>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
        <button type="submit" disabled={pending} className="admin-btn">
          {pending ? 'Guardando…' : pagina ? 'Guardar cambios' : 'Crear página'}
        </button>
        <Link href="/admin/paginas" className="admin-btn-ghost">
          Cancelar
        </Link>
      </div>
    </form>
  )
}
