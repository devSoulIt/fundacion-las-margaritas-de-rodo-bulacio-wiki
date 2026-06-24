import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/app/lib/supabase/server'
import WikiPage from '@/components/wiki/WikiPage'

export async function generateMetadata(props: PageProps<'/galeria/[slug]/obras'>) {
  const { slug } = await props.params
  const supabase = await createClient()
  const { data } = await supabase.from('artistas').select('nombre').eq('slug', slug).single()

  return {
    title: data ? `Obras de ${data.nombre} — Galería de Artistas` : 'Artista no encontrado',
    description: data ? `Obras y producciones artísticas de ${data.nombre}.` : '',
  }
}

export default async function ObrasArtistaPage(props: PageProps<'/galeria/[slug]/obras'>) {
  const { slug } = await props.params
  const supabase = await createClient()

  const { data: artista } = await supabase
    .from('artistas')
    .select('id, nombre, slug')
    .eq('slug', slug)
    .eq('activo', true)
    .single()

  if (!artista) notFound()

  const { data: obras } = await supabase
    .from('obras')
    .select('id, titulo, slug, imagen, descripcion')
    .eq('artista_id', artista.id)
    .eq('activa', true)
    .order('orden')
    .order('titulo')

  return (
    <div>
      {/* Back link */}
      <div style={{ background: 'var(--bg-dark)', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-dark)' }}>
        <div className="max-w-7xl mx-auto" style={{ display: 'flex', gap: '1.5rem' }}>
          <Link
            href={`/galeria/${slug}`}
            className="btn-ghost-dark"
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-faint)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            ← {artista.nombre}
          </Link>
        </div>
      </div>

      {/* Header */}
      <section
        style={{
          background: 'var(--bg-dark)',
          padding: '4rem 1.5rem 3.5rem',
          borderBottom: '1px solid var(--border-dark)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <p
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '1rem',
            }}
          >
            {artista.nombre}
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display), serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--white)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Obras
          </h1>
        </div>
      </section>

      {/* Obras list */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {(!obras || obras.length === 0) && (
            <div
              style={{
                padding: '6rem 0',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-display), serif',
                fontSize: '1.1rem',
                fontStyle: 'italic',
              }}
            >
              Aún no se han cargado obras de este artista.
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {obras?.map((obra) => (
              <article key={obra.id}>
                {obra.imagen && (
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      maxWidth: '700px',
                      aspectRatio: '4/3',
                      background: 'var(--bg-subtle)',
                      overflow: 'hidden',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <Image
                      src={obra.imagen}
                      alt={obra.titulo}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 700px"
                      style={{ background: 'var(--bg-subtle)' }}
                    />
                  </div>
                )}
                <h2
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: 'var(--text)',
                    marginBottom: '1rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {obra.titulo}
                </h2>
                {obra.descripcion && (
                  <div style={{ maxWidth: '680px' }}>
                    <WikiPage contenido={obra.descripcion} />
                  </div>
                )}
                <div style={{ width: '40px', height: '1px', background: 'var(--border)', marginTop: '2rem' }} />
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
