import { createClient } from '@/app/lib/supabase/server'
import ConfiguracionForm from '@/components/admin/ConfiguracionForm'

export default async function ConfiguracionPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('configuracion').select('clave, valor')

  const valores = Object.fromEntries(
    (data ?? []).map((r) => [r.clave, r.valor ?? ''])
  )

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--a-accent)', marginBottom: '0.4rem' }}>
          Ajustes
        </p>
        <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '2rem', fontWeight: 400, fontStyle: 'italic', color: 'var(--a-text)' }}>
          Contacto y redes sociales
        </h1>
      </div>
      <div style={{ background: 'var(--a-surface)', border: '1px solid var(--a-border)', padding: '1.5rem', maxWidth: '560px' }}>
        <ConfiguracionForm valores={valores} />
      </div>
    </div>
  )
}
