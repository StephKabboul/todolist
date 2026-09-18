import React from "react";

type Task = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  due_date: string;
  status: string;
  priority: string;
};

type TaskCardProps = {
  task: Task;
  onEdit: (task: Task) => void;
  isHighlighted: boolean;
  isSelectMode: boolean;
  isSelected: boolean;
  onToggleSelection: (taskId: number) => void;
};

const TaskCard = ({
  task,
  onEdit,
  isHighlighted,
  isSelectMode,
  isSelected,
  onToggleSelection,
}: TaskCardProps) => {

return (
  <div
    id={`task-${task.id}`}
    onClick={() => {
      if (isSelectMode) {
        onToggleSelection(task.id);
      } else {
        onEdit(task);
      }
    }}
    className={`relative mb-4 cursor-pointer rounded-2xl border p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
      isSelected
        ? "border-blue-400 bg-blue-50 ring-2 ring-blue-100"
        : isSelectMode
          ? "border-gray-300 bg-white hover:border-blue-300"
          : "border-gray-200 bg-white"
    } ${
      isHighlighted ? "ring-4 ring-blue-300 animate-pulse" : ""
    }`}
  >
    {isSelectMode && (
      <div
        className={`absolute right-4 top-4 h-5 w-5 rounded-full border-2 transition-all ${
          isSelected
            ? "border-blue-500 bg-blue-500"
            : "border-gray-400 bg-white"
        }`}
      />
    )}
    <div className="mb-3 flex items-start justify-between gap-3">
      <h2
        className={`min-w-0 flex-1 truncate text-lg font-semibold text-gray-900 ${
          isSelectMode ? "pr-8" : ""
        }`}
      >
        {task.title}
      </h2>
      </div>
    <p className="line-clamp-2 min-h-12 text-sm leading-6 text-gray-500">
      {task.description}
    </p>

    <div className="mt-5 flex flex-wrap gap-2">
      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
        {task.status}
      </span>

      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
        {task.priority}
      </span>
    </div>

    <div className="mt-5 border-t border-gray-100 pt-3">
      <p className="text-xs font-medium text-gray-400">
        Due {task.due_date}
      </p>
    </div>
  </div>
);
};

export default TaskCard;