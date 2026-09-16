// "use server";

// import { createClient } from "@/utils/supabase/server";

// export async function saveTask(formData: FormData): Promise<void> {
//   const supabase = await createClient();

//   const title = formData.get("title") as string;
//   const description = formData.get("description") as string;
//   const dueDate = formData.get("due_date") as string;
//   const status = formData.get("status") as string;
//   const priority = formData.get("priority") as string;

//   // Server-side validation if (!title || !dueDate || !status || !priority) { return { success: false, error: "Please fill in all required fields.", }; }
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
//   if (!user) {
//     throw new Error("You must be logged in to create a task.");
//   }

//   const { data, error } = await supabase
//     .from("tasks")
//     .insert({
//       title: title,
//       description: description,
//       due_date: dueDate,
//       status: status,
//       priority: priority,
//       user_id: user.id,
//     })
//     .select();

//   if (error) {
//     console.error("Error adding task:", error);
//     throw new Error(error.message);
//   }
//   console.log("Task added successfully:", data);
// }
"use server";

import { createClient } from "@/utils/supabase/server";

export async function saveTask(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const dueDate = formData.get("due_date") as string || new Date().toISOString();
  const status = formData.get("status") as string;
  const priority = formData.get("priority") as string;

  // Server-side validation
  if (!title) {
    return {
      success: false,
      error: "Please fill in all required fields.",
    };
  }
  console.log("priority:", priority);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in to create a task.",
    };
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title,
      description,
      due_date: dueDate,
      status: !!status ? status : undefined,
      priority: !!priority ? priority : undefined,
      user_id: user.id,
    })
    .select();

  if (error) {
    console.error("Error adding task:", error);

    return {
      success: false,
      error: error.message,
    };
  }

  console.log("Task added successfully:", data);

  return {
    success: true,
      taskId: data[0].id, //supabase row id

  };
}
