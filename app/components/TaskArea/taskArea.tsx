"use client";

import { useEffect, useState } from "react";
import FilterBar from "../FilterBar/filterBar";
import TaskDisplay from "../TaskDisplay/taskDisplay";
import TaskForm from "../TaskForm/taskForm";
import EditTaskModal from "../EditTaskModal/editTaskModal";
import { filterTasksAction } from "@/utils/services/filterTasksAction";
import LogoutButton from "../LogoutButton/logoutButton";

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
  const [highlightedTaskId, setHighlightedTaskId] = useState<number | null>(
    null,
  );

  const loadFilteredTasks = async () => {
    const result = await filterTasksAction(filters);
    setDisplayedTasks(result);
  };

  useEffect(() => {
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
      <div id="addTaskContainer" className="">
        <TaskForm
          statuses={statuses}
          priorities={priorities}
          onTaskChanged={loadFilteredTasks}
        />
      </div>
      <div id="taskDisplay" className="flex flex-col ml-10 w-full">
        <div className="mb-3 flex justify-end">
          <LogoutButton></LogoutButton>
        </div>
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          statuses={statuses}
          priorities={priorities}
        />
        <TaskDisplay
          tasks={displayedTasks}
          onEdit={handleEdit}
          onTaskChanged={loadFilteredTasks}
          highlightedTaskId={highlightedTaskId}
        />

        {selectedTask && (
          <EditTaskModal
            task={selectedTask}
            statuses={statuses}
            priorities={priorities}
            onClose={() => setSelectedTask(null)}
            onTaskChanged={loadFilteredTasks}
            //animation
            onUpdated={(taskId) => {
              console.log("TaskArea received id:", taskId);

              setHighlightedTaskId(taskId);

              setTimeout(() => {
                setHighlightedTaskId(null);
              }, 1200);
            }}
          />
        )}
      </div>
    </div>
  );
};
export default TaskArea;
