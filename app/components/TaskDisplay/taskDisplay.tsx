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

type TaskDisplayProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onTaskChanged?: () => Promise<void>;
    highlightedTaskId: number | null;

};

const TaskDisplay = ({ tasks, onEdit, onTaskChanged, highlightedTaskId }: TaskDisplayProps) => {
  return (        

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

      {tasks.map((task) => (
        
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onTaskChanged={onTaskChanged}
          isHighlighted={task.id === highlightedTaskId}
          
        />
      ))}{" "}
    </div>
  );
};
export default TaskDisplay;
