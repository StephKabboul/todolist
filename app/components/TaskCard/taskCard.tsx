import React from "react";
import ButtonArea from "../ButtonArea/buttonArea";

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
  onTaskChanged?: () => Promise<void>;
isHighlighted: boolean;
};

const TaskCard = ({ task, onEdit, onTaskChanged, isHighlighted }: TaskCardProps) => {

  return (
    <div className={`rounded-xl border-gray-400 bg-gray-300 p-4 mb-4 transition-all duration-300 ${
    isHighlighted ? "ring-4 ring-blue-300 animate-pulse"
      : ""
  }`}>
      <div className="flex justify-between">
        <h2 className="text-lg font-bold underline decoration-2 truncate min-w-0 flex-1">
          {task.title}
        </h2>
        <ButtonArea task={task} onEdit={onEdit} onTaskChanged={onTaskChanged}></ButtonArea>
      </div>

      <p className=" h-13 text-gray-600 line-clamp-2">{task.description}</p>
      <h3 className="text-sm text-gray-300 bg-blue-400 rounded mt-4 pl-1.5 pr-1.5">
        Status: {task.status}
      </h3>
      <h3 className="text-sm text-gray-300 bg-red-400 rounded mt-4 pl-1.5 pr-1.5">
        Priority: {task.priority}
      </h3>
      <p className="text-sm text-gray-300 bg-gray-400 rounded mt-4 pl-1.5 pr-1.5">
        Due: {task.due_date}
      </p>
    </div>
  );
};

export default TaskCard;
