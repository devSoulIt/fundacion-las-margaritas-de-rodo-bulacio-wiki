import type { Metadata } from 'next'
import { Fraunces, DM_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/ui/Navbar'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Fundación Las Margaritas de Rodolfo Bulacio',
  description:
    'Espacio de preservación, investigación y difusión del legado artístico de Rodolfo Bulacio.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer style={{ background: 'var(--bg-dark)', color: 'var(--text-faint)' }}>
          <div style={{ height: '4px', background: 'var(--accent)' }} />
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.1rem', color: 'var(--accent)', lineHeight: 1 }}>✿</span>
              <span
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: '1.1rem',
                  color: 'var(--white)',
                  fontStyle: 'italic',
                  fontWeight: 700,
                }}
              >
                Las Margaritas
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--white)', textAlign: 'center' }}>
              © {new Date().getFullYear()} Fundación Las Margaritas de Rodolfo Bulacio — Mercado Cultural de Monteros
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
