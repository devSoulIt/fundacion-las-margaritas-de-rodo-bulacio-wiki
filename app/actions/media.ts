'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/app/lib/supabase/server'

async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autorizado')
  return supabase
}

export async function subirArchivo(formData: FormData): Promise<{ url: string; error?: string }> {
  const supabase = await requireAuth()

  const archivo = formData.get('archivo') as File
  const carpeta = (formData.get('carpeta') as string) || 'imagenes'

  if (!archivo) return { url: '', error: 'No se recibió ningún archivo' }

  const ext = archivo.name.split('.').pop()
  const nombre = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const path = `${carpeta}/${nombre}`

  const buffer = await archivo.arrayBuffer()
  const { error: uploadError } = await supabase.storage
    .from('wiki-media')
    .upload(path, buffer, { contentType: archivo.type })

  if (uploadError) return { url: '', error: uploadError.message }

  const { data: { publicUrl } } = supabase.storage.from('wiki-media').getPublicUrl(path)

  await supabase.from('media').insert({
    nombre: archivo.name,
    url: publicUrl,
    tipo: archivo.type.startsWith('image') ? 'image' : archivo.type.startsWith('video') ? 'video' : 'document',
    tamanio: archivo.size,
  })

  revalidatePath('/admin/media')
  return { url: publicUrl }
}

export async function eliminarArchivo(id: string, url: string) {
  const supabase = await requireAuth()

  const urlObj = new URL(url)
  const path = urlObj.pathname.split('/wiki-media/')[1]
  if (path) await supabase.storage.from('wiki-media').remove([path])

  await supabase.from('media').delete().eq('id', id)
  revalidatePath('/admin/media')
}
