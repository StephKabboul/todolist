// app/actions.ts
'use server'

import { createClient } from '@/utils/supabase/server' // Your Supabase server client helper
import { revalidatePath } from 'next/cache'

export async function DeleteCard(taskId: number) {
  const supabase = await createClient()


  // 1. Double check who is making this request
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: "Unauthorized: You must be logged in." }
  }

  // Execute the delete query with a filter
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error deleting task:', error.message)
    return { success: false, error: error.message }
  }

  // Refresh the page data where the task was listed
  revalidatePath('/')
  return { success: true }
}
