"use client";

import { useEffect, useState } from "react";
import FilterBar from "../FilterBar/filterBar";
import TaskDisplay from "../TaskDisplay/taskDisplay";
import TaskForm from "../TaskForm/taskForm";
import { filterTasksAction } from "@/utils/services/filterTasksAction";

type Task = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  due_date: string;
  status: string;
  priority: string;
};

type TaskFilters = {
  search: string;
  status: string;
  priority: string;
  due_date: string;
};

type TaskAreaProps = {
  tasks: Task[];
  statuses: string[];
  priorities: string[];
};

const TaskArea = ({ tasks, statuses, priorities }: TaskAreaProps) => {
  const [filters, setFilters] = useState<TaskFilters>({
    search: "",
    status: "",
    priority: "",
    due_date: "",
  });

  const [displayedTasks, setDisplayedTasks] = useState<Task[]>(tasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const loadFilteredTasks = async () => {
      const result = await filterTasksAction(filters);
      setDisplayedTasks(result);
    };
    loadFilteredTasks();
  }, [filters]);


  const handleEdit = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCancelEdit = () => {
    setSelectedTask(null);
  };

  return (
    <div className="flex flex-row m-10">
      {" "}
      <div id="addTaskContainer" className="flex">
        {" "}
        <TaskForm
          statuses={statuses}
          priorities={priorities}
          task={selectedTask}
          onCancelEdit={handleCancelEdit}
        />{" "}
      </div>{" "}
      <div id="taskDisplay" className="flex flex-col ml-10 w-full">
        {" "}
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          statuses={statuses}
          priorities={priorities}
        />{" "}
        <TaskDisplay tasks={displayedTasks} onEdit={handleEdit} />{" "}
      </div>{" "}
    </div>
  );
};
export default TaskArea;
