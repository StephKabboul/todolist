import { createClient } from "@/utils/supabase/server";

type TaskFilters = {
  search?: string;
  status?: string;
  priority?: string;
  due_date?: string;
};

export async function getTasks(filters: TaskFilters = {}) {
  const supabase = await createClient();

  let query = supabase
    .from("tasks")
    .select(
      "id, created_at, title, description, due_date, status, priority"
    );

  // Search by title
  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  // Filter by status
  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  // Filter by priority
  if (filters.priority) {
    query = query.eq("priority", filters.priority);
  }

  // Show tasks due on or before the selected date
  if (filters.due_date) {
    query = query.lte("due_date", filters.due_date);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching tasks:", error.message);
    return [];
  }

  return data ?? [];
}
