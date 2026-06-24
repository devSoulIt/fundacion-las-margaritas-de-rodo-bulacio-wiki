import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/app/lib/supabase/server'
import { actualizarObra } from '@/app/actions/obras'
import ObraForm from '@/components/admin/ObraForm'

export default async function EditarObraPage(props: PageProps<'/admin/obras/[id]/editar'>) {
  const { id } = await props.params
  const supabase = await createClient()

  const [{ data: obra }, { data: artistas }] = await Promise.all([
    supabase.from('obras').select('*').eq('id', id).single(),
    supabase.from('artistas').select('id, nombre').order('nombre'),
  ])

  if (!obra) notFound()

  const action = actualizarObra.bind(null, id)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--a-accent)', marginBottom: '0.4rem' }}>
            Editando obra
          </p>
          <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '2rem', fontWeight: 400, fontStyle: 'italic', color: 'var(--a-text)' }}>
            {obra.titulo}
          </h1>
        </div>
        <Link href="/admin/obras" className="admin-btn-ghost">← Volver</Link>
      </div>
      <ObraForm action={action} artistas={artistas ?? []} obra={obra} />
    </div>
  )
}
