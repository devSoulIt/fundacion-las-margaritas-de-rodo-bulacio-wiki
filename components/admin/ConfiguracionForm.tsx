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
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {CAMPOS.map((campo) => (
        <div key={campo.clave}>
          <label className="admin-label">{campo.label}</label>
          <input
            name={campo.clave}
            defaultValue={valores[campo.clave] ?? ''}
            className="admin-input"
          />
        </div>
      ))}

      {state?.error && (
        <p style={{ fontSize: '0.8rem', color: 'var(--a-danger)', padding: '8px 12px', background: 'rgba(192,80,58,0.1)', border: '1px solid rgba(192,80,58,0.3)' }}>
          {state.error}
        </p>
      )}
      {state?.success && (
        <p style={{ fontSize: '0.8rem', color: 'var(--a-success)', padding: '8px 12px', background: 'rgba(106,170,100,0.1)', border: '1px solid rgba(106,170,100,0.3)' }}>
          Configuración guardada correctamente.
        </p>
      )}

      <div>
        <button type="submit" disabled={pending} className="admin-btn">
          {pending ? 'Guardando…' : 'Guardar'}
        </button>
      </div>
    </form>
  )
}
