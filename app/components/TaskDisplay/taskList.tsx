type Task = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  due_date: string;
  status: string;
  priority: string;
};

type TaskListProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;

  isSelectMode: boolean;
  selectedTaskIds: number[];
  onToggleSelection: (taskId: number) => void;
};

const TaskList = ({
  tasks,
  onEdit,
  isSelectMode,
  selectedTaskIds,
  onToggleSelection,
}: TaskListProps) => {
  return (
    <div className="flex w-full flex-col gap-3">
      {tasks.map((task) => {
        const isSelected = selectedTaskIds.includes(task.id);

        return (
          <div
            key={task.id}
            onClick={() => {
              if (isSelectMode) {
                onToggleSelection(task.id);
              } else {
                onEdit(task);
              }
            }}
            className={`relative flex w-full cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all ${
              isSelected
                ? "border-blue-400 bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
            }`}
          >
            {isSelectMode && (
              <div
                className={`h-5 w-5 shrink-0 rounded-full border-2 ${
                  isSelected
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-400 bg-white"
                }`}
              />
            )}

            <div className="min-w-0 flex-1">
              <h2 className="truncate font-semibold text-gray-900">
                {task.title}
              </h2>

              <p className="truncate text-sm text-gray-500">
                {task.description}
              </p>
            </div>

            <div className="shrink-0">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                {task.status}
              </span>
            </div>

            <div className="shrink-0">
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">
                {task.priority}
              </span>
            </div>

            <p className="shrink-0 text-sm text-gray-400">
              Due: {task.due_date}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
