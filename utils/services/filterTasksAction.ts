"use server";

import { getTasks } from "./getTask";

type TaskFilters = {
  search: string;
  status: string;
  priority: string;
  due_date: string;
};

export async function filterTasksAction(filters: TaskFilters) {
  return await getTasks(filters);
}
