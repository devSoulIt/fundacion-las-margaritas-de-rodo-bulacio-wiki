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

export async function crearArtista(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const supabase = await requireAuth()

  const nombre = formData.get('nombre') as string
  const slug = (formData.get('slug') as string) || slugify(nombre)
  const foto = (formData.get('foto') as string) || null
  const biografia = formData.get('biografia') as string
  const statement = formData.get('statement') as string
  const trayectoria = formData.get('trayectoria') as string
  const activo = formData.get('activo') !== 'false'

  const { error } = await supabase.from('artistas').insert({
    nombre, slug, foto, biografia, statement, trayectoria, activo,
  })

  if (error) return { error: error.message }

  revalidatePath('/admin/artistas')
  revalidatePath('/galeria')
  redirect('/admin/artistas')
}

export async function actualizarArtista(
  id: string,
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const supabase = await requireAuth()

  const nombre = formData.get('nombre') as string
  const slug = (formData.get('slug') as string) || slugify(nombre)
  const foto = (formData.get('foto') as string) || null
  const biografia = formData.get('biografia') as string
  const statement = formData.get('statement') as string
  const trayectoria = formData.get('trayectoria') as string
  const activo = formData.get('activo') !== 'false'

  const { error } = await supabase.from('artistas').update({
    nombre, slug, foto, biografia, statement, trayectoria, activo,
  }).eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/artistas')
  revalidatePath('/galeria')
  revalidatePath(`/galeria/${slug}`)
  redirect('/admin/artistas')
}

export async function eliminarArtista(id: string) {
  const supabase = await requireAuth()
  await supabase.from('artistas').delete().eq('id', id)
  revalidatePath('/admin/artistas')
  revalidatePath('/galeria')
}
