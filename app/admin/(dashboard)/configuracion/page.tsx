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
      <h1 className="text-2xl font-semibold text-zinc-900 mb-6">Contacto y redes sociales</h1>
      <div className="bg-white border border-zinc-200 rounded-xl p-6">
        <ConfiguracionForm valores={valores} />
      </div>
    </div>
  )
}
