'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/server'
import { slugify } from '@/app/lib/utils'

async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autorizado')
  return supabase
}

export async function crearPagina(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const supabase = await requireAuth()

  const titulo = formData.get('titulo') as string
  const slug = (formData.get('slug') as string) || slugify(titulo)
  const contenido = formData.get('contenido') as string
  const resumen = formData.get('resumen') as string
  const imagen_portada = (formData.get('imagen_portada') as string) || null
  const seccion = (formData.get('seccion') as string) || null
  const publicada = formData.get('publicada') === 'true'

  const { error } = await supabase.from('paginas').insert({
    titulo, slug, contenido, resumen, imagen_portada, seccion, publicada,
  })

  if (error) return { error: error.message }

  revalidatePath('/admin/paginas')
  revalidatePath(`/wiki/${slug}`)
  redirect('/admin/paginas')
}

export async function actualizarPagina(
  id: string,
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const supabase = await requireAuth()

  const titulo = formData.get('titulo') as string
  const slug = (formData.get('slug') as string) || slugify(titulo)
  const contenido = formData.get('contenido') as string
  const resumen = formData.get('resumen') as string
  const imagen_portada = (formData.get('imagen_portada') as string) || null
  const seccion = (formData.get('seccion') as string) || null
  const publicada = formData.get('publicada') === 'true'

  const { error } = await supabase.from('paginas').update({
    titulo, slug, contenido, resumen, imagen_portada, seccion, publicada,
  }).eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/paginas')
  revalidatePath(`/wiki/${slug}`)
  redirect('/admin/paginas')
}

export async function eliminarPagina(id: string) {
  const supabase = await requireAuth()
  await supabase.from('paginas').delete().eq('id', id)
  revalidatePath('/admin/paginas')
}

export async function togglePublicada(id: string, publicada: boolean) {
  const supabase = await requireAuth()
  await supabase.from('paginas').update({ publicada: !publicada }).eq('id', id)
  revalidatePath('/admin/paginas')
}
