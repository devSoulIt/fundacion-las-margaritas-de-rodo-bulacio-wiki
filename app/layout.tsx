import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/ui/Navbar'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

export const metadata: Metadata = {
  title: 'Fundación Las Margaritas de Rodolfo Bulacio',
  description:
    'Espacio de preservación, investigación y difusión del legado artístico de Rodolfo Bulacio.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 py-6 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} Fundación Las Margaritas de Rodolfo Bulacio — Mercado Cultural de Monteros
        </footer>
      </body>
    </html>
  )
}
