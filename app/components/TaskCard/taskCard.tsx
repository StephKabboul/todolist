import React from "react";
import { getTaskDetails } from "@/utils/services/getTaskDetails";
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
};

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="rounded-xl border-gray-400 bg-gray-300 p-6 mb-6">
      <div className="flex space-between">
        <h2 className="text-lg font-bold underline decoration-2">
          {task.title}
        </h2>
        <ButtonArea task={task}></ButtonArea>
      </div>

      <p className="w-fit h-10 text-gray-600">{task.description}</p>
      <h3 className="text-sm text-gray-300 bg-blue-400 rounded mt-4">
        Status: {task.status}
      </h3>
      <h3 className="text-sm text-gray-300 bg-red-400 rounded mt-4">
        Priority: {task.priority}
      </h3>
      <p className="text-sm text-gray-300 bg-gray-400 rounded mt-4">
        Due: {task.due_date}
      </p>
    </div>
  );
};

export default TaskCard;
