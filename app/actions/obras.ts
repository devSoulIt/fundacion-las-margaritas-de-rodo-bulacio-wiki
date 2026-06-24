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

export async function crearObra(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const supabase = await requireAuth()

  const titulo = formData.get('titulo') as string
  const slug = (formData.get('slug') as string) || slugify(titulo)
  const artista_id = formData.get('artista_id') as string
  const imagen = (formData.get('imagen') as string) || null
  const descripcion = formData.get('descripcion') as string
  const activa = formData.get('activa') !== 'false'

  const { error } = await supabase.from('obras').insert({
    titulo, slug, artista_id, imagen, descripcion, activa,
  })

  if (error) return { error: error.message }

  revalidatePath('/admin/obras')
  revalidatePath('/galeria')
  revalidatePath('/obras')
  redirect('/admin/obras')
}

export async function actualizarObra(
  id: string,
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const supabase = await requireAuth()

  const titulo = formData.get('titulo') as string
  const slug = (formData.get('slug') as string) || slugify(titulo)
  const artista_id = formData.get('artista_id') as string
  const imagen = (formData.get('imagen') as string) || null
  const descripcion = formData.get('descripcion') as string
  const activa = formData.get('activa') !== 'false'

  const { error } = await supabase.from('obras').update({
    titulo, slug, artista_id, imagen, descripcion, activa,
  }).eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/obras')
  revalidatePath('/galeria')
  revalidatePath('/obras')
  redirect('/admin/obras')
}

export async function eliminarObra(id: string) {
  const supabase = await requireAuth()
  await supabase.from('obras').delete().eq('id', id)
  revalidatePath('/admin/obras')
  revalidatePath('/galeria')
  revalidatePath('/obras')
}
