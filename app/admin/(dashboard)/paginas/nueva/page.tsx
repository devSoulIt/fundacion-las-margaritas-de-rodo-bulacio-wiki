import Link from 'next/link'
import PageForm from '@/components/admin/PageForm'
import { crearPagina } from '@/app/actions/paginas'

export default function NuevaPaginaPage() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--a-accent)', marginBottom: '0.4rem' }}>
            Contenido
          </p>
          <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '2rem', fontWeight: 400, fontStyle: 'italic', color: 'var(--a-text)' }}>
            Nueva página
          </h1>
        </div>
        <Link href="/admin/paginas" className="admin-btn-ghost">← Volver</Link>
      </div>
      <PageForm action={crearPagina} />
    </div>
  )
}
