"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function UpdateCard(
  taskId: number,
  title: string,
  description: string,
  due_date: string,
  status: string,
  priority: string
) {
  const supabase = await createClient();

  // 1. Double check who is making this request
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "Unauthorized: You must be logged in.",
    };
  }

  // 2. Update the task
  const { error } = await supabase
    .from("tasks")
    .update({
      title: title,
      description: description,
      due_date: due_date,
      status: status,
      priority: priority,
    })
    .eq("id", taskId)
    .eq("user_id", user.id);

  if (error) {
    console.error("Error updating task:", error.message);

    return {
      success: false,
      error: error.message,
    };
  }

  // 3. Refresh the page data
  revalidatePath("/");

  return { success: true };
}
