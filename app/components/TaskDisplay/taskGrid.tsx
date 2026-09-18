import TaskCard from "../TaskCard/taskCard";

type Task = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  due_date: string;
  status: string;
  priority: string;
};

type TaskGridProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  highlightedTaskId: number | null;

  isSelectMode: boolean;
  selectedTaskIds: number[];
  onToggleSelection: (taskId: number) => void;

  gridColumns: 1 | 2 | 3 | 4;
};

const TaskGrid = ({
  tasks,
  onEdit,
  highlightedTaskId,
  isSelectMode,
  selectedTaskIds,
  onToggleSelection,
  gridColumns,
}: TaskGridProps) => {
  let gridClass = "";

  if (gridColumns === 1) {
    gridClass = "grid-cols-1";
  }

  if (gridColumns === 2) {
    gridClass = "grid-cols-1 sm:grid-cols-2";
  }

  if (gridColumns === 3) {
    gridClass = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  }

  if (gridColumns === 4) {
    gridClass = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  }

  return (
    <div className={`grid gap-6 ${gridClass}`}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          isHighlighted={task.id === highlightedTaskId}
          isSelectMode={isSelectMode}
          isSelected={selectedTaskIds.includes(task.id)}
          onToggleSelection={onToggleSelection}
        />
      ))}
    </div>
  );
};

export default TaskGrid;