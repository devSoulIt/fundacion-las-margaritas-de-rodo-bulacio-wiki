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
    <form action={formAction} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Nombre *</label>
          <input
            name="nombre"
            required
            defaultValue={artista?.nombre}
            className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            onChange={(e) => {
              const slugInput = document.getElementById('artista-slug') as HTMLInputElement
              if (slugInput && !artista) slugInput.value = slugify(e.target.value)
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Slug</label>
          <input
            id="artista-slug"
            name="slug"
            defaultValue={artista?.slug}
            className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 font-mono"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">Foto (URL)</label>
        <input
          name="foto"
          defaultValue={artista?.foto ?? ''}
          className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">Biografía</label>
        <RichEditor name="biografia" defaultValue={artista?.biografia ?? ''} placeholder="Biografía del artista…" />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">Statement / Texto curatorial</label>
        <textarea
          name="statement"
          rows={3}
          defaultValue={artista?.statement ?? ''}
          className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">Trayectoria y antecedentes</label>
        <RichEditor name="trayectoria" defaultValue={artista?.trayectoria ?? ''} placeholder="Recorrido artístico…" />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="activo"
          name="activo"
          value="true"
          defaultChecked={artista?.activo ?? true}
          className="h-4 w-4 rounded border-zinc-300 accent-zinc-900"
        />
        <label htmlFor="activo" className="text-sm text-zinc-700">Visible en la galería pública</label>
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
          {pending ? 'Guardando…' : artista ? 'Guardar cambios' : 'Crear artista'}
        </button>
        <Link
          href="/admin/artistas"
          className="px-4 py-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
        >
          Cancelar
        </Link>
      </div>
    </form>
  )
}
