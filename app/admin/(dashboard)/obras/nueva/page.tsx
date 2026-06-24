import Link from 'next/link'
import { createClient } from '@/app/lib/supabase/server'
import ObraForm from '@/components/admin/ObraForm'
import { crearObra } from '@/app/actions/obras'

export default async function NuevaObraPage() {
  const supabase = await createClient()
  const { data: artistas } = await supabase
    .from('artistas')
    .select('id, nombre')
    .order('nombre')

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--a-accent)', marginBottom: '0.4rem' }}>
            Obras
          </p>
          <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '2rem', fontWeight: 400, fontStyle: 'italic', color: 'var(--a-text)' }}>
            Nueva obra
          </h1>
        </div>
        <Link href="/admin/obras" className="admin-btn-ghost">← Volver</Link>
      </div>
      <ObraForm action={crearObra} artistas={artistas ?? []} />
    </div>
  )
}
