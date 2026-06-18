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
    instagram && { label: 'Instagram', value: instagram, href: instagram.startsWith('http') ? instagram : `https://${instagram}` },
    facebook && { label: 'Facebook', value: facebook, href: facebook.startsWith('http') ? facebook : `https://${facebook}` },
    youtube && { label: 'YouTube', value: youtube, href: youtube.startsWith('http') ? youtube : `https://${youtube}` },
  ].filter(Boolean) as { label: string; value: string; href: string }[]

  return (
    <div>
      {/* Header */}
      <section
        style={{
          background: 'var(--bg-dark)',
          padding: '5rem 1.5rem 4rem',
          borderBottom: '1px solid var(--border-dark)',
        }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <p
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '1rem',
            }}
          >
            Fundación Las Margaritas
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display), serif',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--white)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Contacto & Redes
          </h1>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          {cfg.length === 0 && (
            <p
              style={{
                textAlign: 'center',
                padding: '4rem 0',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-display), serif',
                fontStyle: 'italic',
              }}
            >
              La información de contacto se está cargando. Volvé pronto.
            </p>
          )}

          {/* Contact items */}
          {(direccion || telefono || whatsapp || whatsappNum || email) && (
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                  Información
                </span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              </div>
              <div>
                {direccion && <ContactRow label="Ubicación" value={direccion} icon="location" />}
                {telefono && <ContactRow label="Teléfono" value={telefono} href={`tel:${telefono}`} icon="phone" />}
                {(whatsapp || whatsappNum) && (
                  <ContactRow
                    label="WhatsApp"
                    value={whatsapp ? `${whatsapp} — ${whatsappNum}` : whatsappNum}
                    href={whatsappNum ? `https://wa.me/${whatsappNum.replace(/\D/g, '')}` : undefined}
                    icon="whatsapp"
                  />
                )}
                {email && <ContactRow label="Email" value={email} href={`mailto:${email}`} icon="email" />}
              </div>
            </div>
          )}

          {redes.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                  Redes Sociales
                </span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {redes.map((r) => (
                  <a
                    key={r.label}
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '10px 20px',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      textDecoration: 'none',
                      fontSize: '0.8rem',
                      letterSpacing: '0.06em',
                      transition: 'border-color 0.2s, color 0.2s',
                    }}
                  >
                    {r.label}
                    <span style={{ fontSize: '0.65rem', opacity: 0.5 }}>↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function ContactRow({ label, value, href, icon }: {
  label: string
  value: string
  href?: string
  icon?: string
}) {
  const iconMap: Record<string, React.ReactNode> = {
    location: (
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21C12 21 5 13.5 5 9a7 7 0 0 1 14 0c0 4.5-7 12-7 12z" />
        <circle cx="12" cy="9" r="2.5" strokeWidth={1.5} />
      </svg>
    ),
    phone: (
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5.5C3 14.06 9.94 21 18.5 21c.386 0 .77-.014 1.148-.042.435-.033.653-.05.854-.162a1.5 1.5 0 0 0 .548-.617c.1-.21.1-.453.1-.938v-3.545c0-.4 0-.6-.065-.778a1.5 1.5 0 0 0-.416-.592c-.148-.13-.345-.213-.739-.378l-3.5-1.5c-.44-.188-.66-.282-.88-.296a1.5 1.5 0 0 0-.861.207c-.197.12-.358.31-.679.69l-1 1.2c-.3.36-.449.54-.633.605a1 1 0 0 1-.596.013c-.188-.057-.345-.224-.66-.558A12.027 12.027 0 0 1 7.5 10.5c-.327-.308-.49-.462-.549-.647a1 1 0 0 1 .012-.595c.064-.184.244-.334.604-.634l1.2-1c.38-.32.57-.48.69-.68a1.5 1.5 0 0 0 .207-.86c-.014-.22-.108-.44-.296-.88l-1.5-3.5c-.165-.394-.248-.59-.378-.74a1.5 1.5 0 0 0-.592-.416C6.22 3 6.02 3 5.62 3H2.076c-.485 0-.728 0-.937.1a1.5 1.5 0 0 0-.617.548c-.112.201-.13.42-.162.854A16.51 16.51 0 0 0 3 5.5z" />
      </svg>
    ),
    whatsapp: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.885 3.49" />
      </svg>
    ),
    email: (
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
      </svg>
    ),
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1.25rem',
        padding: '1.25rem 0',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent)',
          marginTop: '2px',
        }}
      >
        {icon && iconMap[icon]}
      </div>
      <div>
        <p
          style={{
            fontSize: '0.62rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--text-faint)',
            marginBottom: '0.3rem',
          }}
        >
          {label}
        </p>
        {href ? (
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="contact-link"
            style={{
              fontSize: '0.95rem',
              color: 'var(--text)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              textDecorationColor: 'var(--border)',
              transition: 'color 0.2s',
            }}
          >
            {value}
          </a>
        ) : (
          <p style={{ fontSize: '0.95rem', color: 'var(--text)' }}>{value}</p>
        )}
      </div>
    </div>
  )
}
