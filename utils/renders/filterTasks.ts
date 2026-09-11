export type TaskFilters = {
    search: string;
    status: string;
    priority: string;
    due_date: string;
}

export function filterTasks(tasks: any[], filters: TaskFilters) {
  return tasks.filter((task) => {
    // Search by title or description
    const searchMatch =
      filters.search === "" ||
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description?.toLowerCase().includes(filters.search.toLowerCase());

    // Filter by status
    const statusMatch =
      filters.status === "" || task.status === filters.status;

    // Filter by priority
    const priorityMatch =
      filters.priority === "" || task.priority === filters.priority;

    // Filter by maximum due date
    const dueDateMatch =
      filters.due_date === "" ||
      (task.due_date && task.due_date <= filters.due_date);

    return searchMatch && statusMatch && priorityMatch && dueDateMatch;
  });
}

