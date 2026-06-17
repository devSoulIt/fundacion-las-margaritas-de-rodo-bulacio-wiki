'use client'

import { useActionState } from 'react'
import { guardarConfiguracion } from '@/app/actions/configuracion'

const CAMPOS = [
  { clave: 'direccion', label: 'Dirección' },
  { clave: 'telefono', label: 'Teléfono' },
  { clave: 'whatsapp', label: 'WhatsApp (nombre)' },
  { clave: 'whatsapp_numero', label: 'WhatsApp (número)' },
  { clave: 'email', label: 'Correo electrónico' },
  { clave: 'sitio_web', label: 'Sitio web' },
  { clave: 'instagram', label: 'Instagram (@usuario o URL)' },
  { clave: 'facebook', label: 'Facebook (URL)' },
  { clave: 'youtube', label: 'YouTube (URL)' },
]

interface Props {
  valores: Record<string, string>
}

export default function ConfiguracionForm({ valores }: Props) {
  const [state, action, pending] = useActionState(guardarConfiguracion, null)

  return (
    <form action={action} className="space-y-4">
      {CAMPOS.map((campo) => (
        <div key={campo.clave}>
          <label className="block text-sm font-medium text-zinc-700 mb-1">{campo.label}</label>
          <input
            name={campo.clave}
            defaultValue={valores[campo.clave] ?? ''}
            className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </div>
      ))}

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          Configuración guardada correctamente.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="bg-zinc-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-zinc-700 transition-colors disabled:opacity-50"
      >
        {pending ? 'Guardando…' : 'Guardar'}
      </button>
    </form>
  )
}
