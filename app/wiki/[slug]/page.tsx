import { notFound } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/app/lib/supabase/server'
import WikiPage from '@/components/wiki/WikiPage'
import { formatDate } from '@/app/lib/utils'

export async function generateMetadata(props: PageProps<'/wiki/[slug]'>) {
  const { slug } = await props.params
  const supabase = await createClient()
  const { data } = await supabase.from('paginas').select('titulo, resumen').eq('slug', slug).single()

  return {
    title: data ? `${data.titulo} — Fundación Las Margaritas` : 'Página no encontrada',
    description: data?.resumen ?? '',
  }
}

export default async function WikiPageRoute(props: PageProps<'/wiki/[slug]'>) {
  const { slug } = await props.params
  const supabase = await createClient()

  const { data: pagina } = await supabase
    .from('paginas')
    .select('*')
    .eq('slug', slug)
    .eq('publicada', true)
    .single()

  if (!pagina) notFound()

  return (
    <article>
      {/* Cover image */}
      {pagina.imagen_portada && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '21/8',
            overflow: 'hidden',
            background: 'var(--bg-dark)',
          }}
        >
          <Image
            src={pagina.imagen_portada}
            alt={pagina.titulo}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            style={{ opacity: 0.85 }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, var(--bg-dark) 0%, transparent 60%)',
            }}
          />
        </div>
      )}

      {/* Header */}
      <header
        style={{
          background: pagina.imagen_portada ? 'var(--bg-dark)' : 'var(--bg-dark)',
          padding: pagina.imagen_portada ? '2rem 1.5rem 4rem' : '5rem 1.5rem 4rem',
          borderBottom: '1px solid var(--border-dark)',
        }}
      >
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ width: '40px', height: '1px', background: 'var(--accent)', marginBottom: '1.5rem' }} />
          <h1
            style={{
              fontFamily: 'var(--font-display), serif',
              fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--white)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
            }}
          >
            {pagina.titulo}
          </h1>
          {pagina.resumen && (
            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: 'var(--white)',
                maxWidth: '36rem',
                marginBottom: '1.25rem',
              }}
            >
              {pagina.resumen}
            </p>
          )}
          <p
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--white)',
              opacity: 0.8,
            }}
          >
            Actualizado: {formatDate(pagina.updated_at)}
          </p>
        </div>
      </header>

      {/* Body */}
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        {pagina.contenido && <WikiPage contenido={pagina.contenido} />}
      </div>
    </article>
  )
}
