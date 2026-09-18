import TaskGrid from "./taskGrid";
import TaskList from "./taskList";
type Task = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  due_date: string;
  status: string;
  priority: string;
};

type TaskDisplayProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onTaskChanged?: () => Promise<void>;
  highlightedTaskId: number | null;
  isSelectMode: boolean;
  selectedTaskIds: number[];
  onToggleSelection: (taskId: number) => void;
  viewMode: "grid" | "list";
gridColumns: 1 | 2 | 3 | 4;
};

const TaskDisplay = ({
  tasks,
  onEdit,
  onTaskChanged,
  highlightedTaskId,
  isSelectMode,
  selectedTaskIds,
  onToggleSelection,
    viewMode,
  gridColumns,
}: TaskDisplayProps) => {
  if (viewMode === "list") {
    return (
      <TaskList
        tasks={tasks}
        onEdit={onEdit}
        isSelectMode={isSelectMode}
        selectedTaskIds={selectedTaskIds}
        onToggleSelection={onToggleSelection}
      />
    );
  }

  return (
    <TaskGrid
      tasks={tasks}
      onEdit={onEdit}
      highlightedTaskId={highlightedTaskId}
      isSelectMode={isSelectMode}
      selectedTaskIds={selectedTaskIds}
      onToggleSelection={onToggleSelection}
      gridColumns={gridColumns}
    />
  );
};
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {tasks.map((task) => (
//         <TaskCard
//           key={task.id}
//           task={task}
//           onEdit={onEdit}
//           isHighlighted={task.id === highlightedTaskId}
//           isSelectMode={isSelectMode}
//           isSelected={selectedTaskIds.includes(task.id)}
//           onToggleSelection={onToggleSelection}
//         />
//       ))}
//     </div>
//   );
// };
export default TaskDisplay;
