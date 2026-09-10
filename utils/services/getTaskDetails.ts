import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getTaskDetails() {
  const cookieStore = await cookies();
  const supabase = await createClient();

  const { data, error } = await supabase.from("tasks").select("*");

  if (error) {
    console.error("Error fetching task details:", error);
    return [];
  }
  return data;
}
