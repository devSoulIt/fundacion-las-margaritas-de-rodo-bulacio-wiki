import Link from 'next/link'
import ArtistaForm from '@/components/admin/ArtistaForm'
import { crearArtista } from '@/app/actions/artistas'

export default function NuevoArtistaPage() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--a-accent)', marginBottom: '0.4rem' }}>
            Galería
          </p>
          <h1 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '2rem', fontWeight: 400, fontStyle: 'italic', color: 'var(--a-text)' }}>
            Nuevo artista
          </h1>
        </div>
        <Link href="/admin/artistas" className="admin-btn-ghost">← Volver</Link>
      </div>
      <ArtistaForm action={crearArtista} />
    </div>
  )
}
