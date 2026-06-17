import Link from 'next/link'

const SECCIONES = [
  {
    titulo: 'Rodolfo Bulacio',
    href: '/wiki/rodolfo-bulacio',
    descripcion: 'Artista visual, performer y referente cultural tucumano cuya obra desafió los límites de su época.',
  },
  {
    titulo: 'Fundación Las Margaritas',
    href: '/wiki/fundacion-las-margaritas',
    descripcion: 'Nacida del amor y la memoria, la fundación preserva y difunde el legado artístico de Rodolfo.',
  },
  {
    titulo: 'Sala de Arte Contemporáneo',
    href: '/wiki/sala-de-arte',
    descripcion: 'Espacio en el Mercado Cultural de Monteros que alberga la muestra permanente de Rodolfo Bulacio.',
  },
  {
    titulo: 'Galería de Artistas',
    href: '/galeria',
    descripcion: 'Artistas que forman parte de la propuesta expositiva de la Fundación Las Margaritas.',
  },
  {
    titulo: 'Archivo y Memoria',
    href: '/wiki/archivo-y-memoria',
    descripcion: 'Catálogos, publicaciones, fotografías históricas y material audiovisual del legado de Rodolfo.',
  },
  {
    titulo: 'Contacto y Redes',
    href: '/contacto',
    descripcion: 'Encontrá la Sala en el Mercado Cultural de Monteros y seguinos en nuestras redes.',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-zinc-900 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-medium text-zinc-400 mb-3 tracking-wider uppercase">Fundación</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Las Margaritas de<br />Rodolfo Bulacio
          </h1>
          <p className="text-lg text-zinc-300 max-w-xl leading-relaxed">
            Preservamos, investigamos y difundimos el legado artístico de Rodolfo Bulacio —
            artista visual, performer y referente cultural del norte argentino.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/wiki/rodolfo-bulacio"
              className="bg-white text-zinc-900 rounded-full px-5 py-2.5 text-sm font-medium hover:bg-zinc-100 transition-colors"
            >
              Conocer a Rodolfo
            </Link>
            <Link
              href="/wiki/fundacion-las-margaritas"
              className="border border-zinc-600 text-white rounded-full px-5 py-2.5 text-sm font-medium hover:border-zinc-400 transition-colors"
            >
              La Fundación
            </Link>
          </div>
        </div>
      </section>

      {/* Secciones */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold text-zinc-900 mb-8">Explorá la wiki</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SECCIONES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group bg-white border border-zinc-200 rounded-xl p-5 hover:border-zinc-400 hover:shadow-sm transition-all"
              >
                <h3 className="font-semibold text-zinc-900 mb-2 group-hover:text-zinc-700">
                  {s.titulo}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{s.descripcion}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-zinc-50 border-t border-zinc-100 py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <blockquote className="text-xl italic text-zinc-700 leading-relaxed">
            "Algunas obras no terminan cuando su creador ya no está; continúan creciendo en las personas que las abrazan, las comparten y las mantienen vivas."
          </blockquote>
          <p className="mt-4 text-sm text-zinc-400">— Fundación Las Margaritas de Rodolfo Bulacio</p>
        </div>
      </section>
    </div>
  )
}
