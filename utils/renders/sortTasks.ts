type Task = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  due_date: string;
  status: string;
  priority: string;
};

type TaskSort = {
  field: "title" | "status" | "priority" | "due_date" | "created_at";
  direction: "asc" | "desc";
};

export function sortTasks(tasks: Task[], sort: TaskSort) {
  const sortedTasks = [...tasks];

sortedTasks.sort((a, b) => {
  let comparison = 0;

  if (sort.field === "title") {
    comparison = a.title.localeCompare(b.title);
  }

  if (sort.field === "due_date") {
    comparison =
      new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
  }

  if (sort.field === "created_at") {
    comparison =
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  }

  if (sort.field === "status") {
    const statusOrder: Record<string, number> = {
      "Not Started": 1,
      "Ongoing": 2,
      "Done": 3,
    };

    comparison = statusOrder[a.status] - statusOrder[b.status];
  }

  if (sort.field === "priority") {
    const priorityOrder: Record<string, number> = {
      "Not Urgent": 1,
      "Urgent": 2,
      "Very Urgent": 3,
    };

    comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
  }

  return sort.direction === "asc" ? comparison : -comparison;
});
  return sortedTasks;
}