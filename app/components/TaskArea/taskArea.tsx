"use client";

import { useEffect, useState } from "react";
import FilterBar from "../FilterBar/filterBar";
import TaskDisplay from "../TaskDisplay/taskDisplay";
import TaskForm from "../TaskForm/taskForm";
import EditTaskModal from "../EditTaskModal/editTaskModal";
import { filterTasksAction } from "@/utils/services/filterTasksAction";
import { sortTasks } from "@/utils/renders/sortTasks";
import LogoutButton from "../LogoutButton/logoutButton";
import Image from "next/image";

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

type TaskSort = {
  field: "title" | "status" | "priority" | "due_date" | "created_at";
  direction: "asc" | "desc";
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

  const [sort, setSort] = useState<TaskSort>({
    field: "created_at",
    direction: "desc",
  });

  const [displayedTasks, setDisplayedTasks] = useState<Task[]>(tasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [highlightedTaskId, setHighlightedTaskId] = useState<number | null>(
    null,
  );
  const [isAddTaskCollapsed, setIsAddTaskCollapsed] = useState(false);
  const [scrollToTaskId, setScrollToTaskId] = useState<number | null>(null);

  const loadFilteredTasks = async () => {
    const result = await filterTasksAction(filters);

    console.log("SORT:", sort);
    console.log("BEFORE:", result);
    const sortedResult = sortTasks(result, sort);
    console.log("AFTER:", sortedResult);

    setDisplayedTasks(sortedResult);
  };

  useEffect(() => {
    loadFilteredTasks();
  }, [filters, sort]);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCancelEdit = () => {
    setSelectedTask(null);
  };

  console.log("TaskArea rendered");
  console.log("Current sort:", sort);

  useEffect(() => {
    if (scrollToTaskId === null) return;

    const element = document.getElementById(`task-${scrollToTaskId}`);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setScrollToTaskId(null);
    }
  }, [displayedTasks, scrollToTaskId]);

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-full min-h-0 flex-row">
        <div id="addTaskContainer" className="shrink-0 self-start">
          {isAddTaskCollapsed ? (
            <button type="button" onClick={() => setIsAddTaskCollapsed(false)}>
              <Image
                src="/right-arrow.png"
                alt="expand"
                width={18}
                height={18}
              ></Image>
            </button>
          ) : (
            <div>
              <button type="button" onClick={() => setIsAddTaskCollapsed(true)}>
                <Image
                  src="/left-arrow.png"
                  alt="collapse"
                  width={18}
                  height={18}
                ></Image>
              </button>

              <TaskForm
                statuses={statuses}
                priorities={priorities}
                onTaskChanged={loadFilteredTasks}
                onTaskAdded={(taskId) => {
                  setHighlightedTaskId(taskId);
                  setScrollToTaskId(taskId);

                  setTimeout(() => {
                    setHighlightedTaskId(null);
                  }, 1200);
                }}
              />
            </div>
          )}
        </div>
        <div
          id="taskDisplay"
          className="ml-10 flex min-h-0 min-w-0 flex-1 flex-col"
        >
          <div className="mb-3 flex shrink-0 justify-end">
            <LogoutButton></LogoutButton>
          </div>
          <div className="shrink-0">
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              sort={sort}
              setSort={setSort}
              statuses={statuses}
              priorities={priorities}
            />
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto pr-2">
            <TaskDisplay
              tasks={displayedTasks}
              onEdit={handleEdit}
              onTaskChanged={loadFilteredTasks}
              highlightedTaskId={highlightedTaskId}
            />
          </div>
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
                setScrollToTaskId(taskId)
                setTimeout(() => {
                  setHighlightedTaskId(null);
                }, 1200);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default TaskArea;
