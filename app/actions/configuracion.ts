'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/app/lib/supabase/server'

async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autorizado')
  return supabase
}

export async function guardarConfiguracion(
  _prevState: { error: string; success: boolean } | null,
  formData: FormData
): Promise<{ error: string; success: boolean }> {
  const supabase = await requireAuth()

  const claves = [
    'telefono', 'whatsapp', 'whatsapp_numero', 'email',
    'sitio_web', 'instagram', 'facebook', 'youtube', 'direccion',
  ]

  const updates = claves.map((clave) => ({
    clave,
    valor: (formData.get(clave) as string) ?? '',
    label: clave,
  }))

  const { error } = await supabase
    .from('configuracion')
    .upsert(updates, { onConflict: 'clave' })

  if (error) return { error: error.message, success: false }

  revalidatePath('/contacto')
  revalidatePath('/admin/configuracion')
  return { error: '', success: true }
}
