'use server'

import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'

export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get('file') as File
    const blob = await put(file.name, file, {
      access: 'public',
    })

    revalidatePath('/')
    return { success: true, url: blob.url }
  } catch (error) {
    return { success: false, error: 'Failed to upload file' }
  }
}

