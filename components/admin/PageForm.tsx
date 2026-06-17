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
  { value: 'sala-de-arte', label: 'Sala de Arte' },
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
    <form action={formAction} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Título *</label>
          <input
            name="titulo"
            required
            defaultValue={pagina?.titulo}
            className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            onChange={(e) => {
              const slugInput = document.getElementById('slug-input') as HTMLInputElement
              if (slugInput && !pagina) slugInput.value = slugify(e.target.value)
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Slug (URL)</label>
          <input
            id="slug-input"
            name="slug"
            defaultValue={pagina?.slug}
            className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 font-mono"
            placeholder="se-genera-automatico"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">Resumen (para SEO y cards)</label>
        <textarea
          name="resumen"
          rows={2}
          defaultValue={pagina?.resumen ?? ''}
          className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Sección del menú</label>
          <select
            name="seccion"
            defaultValue={pagina?.seccion ?? ''}
            className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 bg-white"
          >
            {SECCIONES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Imagen de portada (URL)</label>
          <input
            name="imagen_portada"
            defaultValue={pagina?.imagen_portada ?? ''}
            className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            placeholder="https://..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">Contenido</label>
        <RichEditor
          name="contenido"
          defaultValue={pagina?.contenido ?? ''}
          placeholder="Escribí el contenido de la página…"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="publicada"
          name="publicada"
          value="true"
          defaultChecked={pagina?.publicada}
          className="h-4 w-4 rounded border-zinc-300 accent-zinc-900"
        />
        <label htmlFor="publicada" className="text-sm text-zinc-700">Publicar (visible en el sitio)</label>
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-zinc-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-zinc-700 transition-colors disabled:opacity-50"
        >
          {pending ? 'Guardando…' : pagina ? 'Guardar cambios' : 'Crear página'}
        </button>
        <Link
          href="/admin/paginas"
          className="px-4 py-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
        >
          Cancelar
        </Link>
      </div>
    </form>
  )
}
