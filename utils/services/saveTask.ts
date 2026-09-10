"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function saveTask(formData: FormData): Promise<void> {
  const cookieStore = await cookies();
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const dueDate = formData.get("due_date") as string;
  const status = formData.get("status") as string;
  const priority = formData.get("priority") as string;

  console.log("Form data:", {
    title,
    description,
    dueDate,
    status,
    priority,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("You must be logged in to create a task.");
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title: title,
      description: description,
      due_date: dueDate,
      status: status,
      priority: priority,
      user_id: user.id,
    })
    .select();

  if (error) {
    console.error("Error adding task:", error);
    throw new Error(error.message);
  }
  console.log("Task added successfully:", data);
}
