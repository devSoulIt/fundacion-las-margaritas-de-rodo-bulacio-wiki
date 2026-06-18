import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/ui/Navbar'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
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
    <html lang="es" className={`${cormorant.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col" style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body), sans-serif' }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-dark)', color: 'var(--text-faint)' }} className="py-10 px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <span style={{ fontFamily: 'var(--font-display), serif', fontSize: '1.1rem', color: 'var(--white)', fontStyle: 'italic' }}>
              Las Margaritas
            </span>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              © {new Date().getFullYear()} Fundación Las Margaritas de Rodolfo Bulacio — Mercado Cultural de Monteros
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
