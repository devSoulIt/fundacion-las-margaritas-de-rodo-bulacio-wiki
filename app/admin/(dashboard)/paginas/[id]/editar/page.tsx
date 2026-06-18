import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/app/lib/supabase/server'
import { actualizarPagina } from '@/app/actions/paginas'
import PageForm from '@/components/admin/PageForm'

export default async function EditarPaginaPage(props: PageProps<'/admin/paginas/[id]/editar'>) {
  const { id } = await props.params
  const supabase = await createClient()

  const { data: pagina } = await supabase
    .from('paginas')
    .select('*')
    .eq('id', id)
    .single()

  if (!pagina) notFound()

  const action = actualizarPagina.bind(null, id)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--a-accent)', marginBottom: '0.4rem' }}>
            Editando
          </p>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '2rem', fontWeight: 400, fontStyle: 'italic', color: 'var(--a-text)' }}>
            {pagina.titulo}
          </h1>
        </div>
        <Link href="/admin/paginas" className="admin-btn-ghost">← Volver</Link>
      </div>
      <PageForm action={action} pagina={pagina} />
    </div>
  )
}
