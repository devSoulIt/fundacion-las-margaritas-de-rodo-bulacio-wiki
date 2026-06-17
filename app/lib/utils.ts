import slugifyLib from 'slugify'

export function slugify(text: string): string {
  return slugifyLib(text, { lower: true, strict: true, locale: 'es' })
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
