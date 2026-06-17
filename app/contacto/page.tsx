import { createClient } from '@/app/lib/supabase/server'

export const metadata = {
  title: 'Contacto y Redes — Fundación Las Margaritas',
}

function getVal(config: { clave: string; valor: string | null }[], clave: string) {
  return config.find((c) => c.clave === clave)?.valor ?? ''
}

export default async function ContactoPage() {
  const supabase = await createClient()
  const { data: config } = await supabase.from('configuracion').select('clave, valor')

  const cfg = config ?? []

  const telefono = getVal(cfg, 'telefono')
  const whatsapp = getVal(cfg, 'whatsapp')
  const whatsappNum = getVal(cfg, 'whatsapp_numero')
  const email = getVal(cfg, 'email')
  const instagram = getVal(cfg, 'instagram')
  const facebook = getVal(cfg, 'facebook')
  const youtube = getVal(cfg, 'youtube')
  const direccion = getVal(cfg, 'direccion')

  const redes = [
    { label: 'Instagram', valor: instagram, emoji: '📷' },
    { label: 'Facebook', valor: facebook, emoji: '📘' },
    { label: 'YouTube', valor: youtube, emoji: '▶️' },
  ].filter((r) => r.valor)

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-zinc-900 mb-2">Contacto y Redes</h1>
      <p className="text-zinc-500 mb-10">
        Fundación Las Margaritas de Rodolfo Bulacio
      </p>

      <div className="space-y-4">
        {direccion && (
          <ContactRow emoji="📍" label="Ubicación" value={direccion} />
        )}
        {telefono && (
          <ContactRow emoji="📞" label="Teléfono" value={telefono} href={`tel:${telefono}`} />
        )}
        {(whatsapp || whatsappNum) && (
          <ContactRow
            emoji="📲"
            label="WhatsApp"
            value={whatsapp ? `${whatsapp} — ${whatsappNum}` : whatsappNum}
            href={whatsappNum ? `https://wa.me/${whatsappNum.replace(/\D/g, '')}` : undefined}
          />
        )}
        {email && (
          <ContactRow emoji="📧" label="Email" value={email} href={`mailto:${email}`} />
        )}

        {redes.length > 0 && (
          <div className="pt-4 border-t border-zinc-100">
            <p className="text-sm font-medium text-zinc-700 mb-3">Redes sociales</p>
            <div className="flex flex-col gap-2">
              {redes.map((r) => (
                <ContactRow key={r.label} emoji={r.emoji} label={r.label} value={r.valor} href={r.valor.startsWith('http') ? r.valor : `https://${r.valor}`} />
              ))}
            </div>
          </div>
        )}
      </div>

      {cfg.length === 0 && (
        <p className="text-zinc-400 text-center py-16">
          La información de contacto se está cargando. Volvé pronto.
        </p>
      )}
    </div>
  )
}

function ContactRow({
  emoji,
  label,
  value,
  href,
}: {
  emoji: string
  label: string
  value: string
  href?: string
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-zinc-100 last:border-0">
      <span className="text-xl shrink-0">{emoji}</span>
      <div>
        <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide">{label}</p>
        {href ? (
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="text-sm text-zinc-900 hover:text-zinc-600 underline underline-offset-2 transition-colors"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm text-zinc-900">{value}</p>
        )}
      </div>
    </div>
  )
}
