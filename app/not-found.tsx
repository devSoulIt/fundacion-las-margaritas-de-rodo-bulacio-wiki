import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-6xl font-bold text-zinc-200 mb-4">404</p>
      <h1 className="text-xl font-semibold text-zinc-900 mb-2">Página no encontrada</h1>
      <p className="text-zinc-500 mb-8 max-w-sm">
        El contenido que buscás no existe o fue movido.
      </p>
      <Link
        href="/"
        className="bg-zinc-900 text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-zinc-700 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
