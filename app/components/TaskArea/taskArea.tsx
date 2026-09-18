"use client";

import { useEffect, useState } from "react";
import FilterBar from "../FilterBar/filterBar";
import TaskDisplay from "../TaskDisplay/taskDisplay";
import TaskForm from "../TaskForm/taskForm";
import EditTaskModal from "../EditTaskModal/editTaskModal";
import SideBar from "../SideBar/sideBar";
import { filterTasksAction } from "@/utils/services/filterTasksAction";
import { sortTasks } from "@/utils/renders/sortTasks";
import { DeleteCard } from "@/utils/services/deleteCard";
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
  const [isAddTaskCollapsed, setIsAddTaskCollapsed] = useState(true);
  const [scrollToTaskId, setScrollToTaskId] = useState<number | null>(null);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedTaskIds, setSelectedTaskIds] = useState<number[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  //for view
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [gridColumns, setGridColumns] = useState<1 | 2 | 3 | 4>(4);

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

  const handleToggleSelectMode = () => {
    setIsSelectMode((prev) => !prev);

    // clear selections whenever leaving/entering selection mode
    setSelectedTaskIds([]);
  };

  const handleToggleTaskSelection = (taskId: number) => {
    setSelectedTaskIds((prev) => {
      if (prev.includes(taskId)) {
        return prev.filter((id) => id !== taskId);
      }

      return [...prev, taskId];
    });
  };

  const handleDeleteSelected = async () => {
    if (selectedTaskIds.length === 0) return;

    setIsDeleting(true);

    const results = await Promise.all(
      selectedTaskIds.map((taskId) => DeleteCard(taskId)),
    );

    const failedDelete = results.find((result) => !result.success);

    if (failedDelete) {
      alert(`Failed to delete: ${failedDelete.error}`);
      setIsDeleting(false);
      return;
    }

    await loadFilteredTasks();

    setSelectedTaskIds([]);
    setIsSelectMode(false);
    setIsDeleteModalOpen(false);
    setIsDeleting(false);
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
    <div className="flex h-screen overflow-hidden">
      <SideBar
        filters={filters}
        setFilters={setFilters}
        onToggleAddTask={() => setIsAddTaskCollapsed((prev) => !prev)}
        isSelectMode={isSelectMode}
        onToggleSelectMode={handleToggleSelectMode}
        selectedCount={selectedTaskIds.length}
        onDeleteSelected={() => setIsDeleteModalOpen(true)}
        viewMode={viewMode}
        setViewMode={setViewMode}
        gridColumns={gridColumns}
        setGridColumns={setGridColumns}
      />
      <div className={`flex h-full min-w-0 flex-1 flex-row lg:flex-row p-5 ${
    isAddTaskCollapsed ? "gap-0" : "gap-6"
  }`}>
        <div
          id="addTaskContainer"
          className={`h-full shrink-0 overflow-hidden transition-all duration-600 ${
            isAddTaskCollapsed ? "w-0 opacity-0" : "w-full opacity-100 lg:w-md"
          }`}
        >
          <TaskForm
            statuses={statuses}
            priorities={priorities}
            onClose={() => setIsAddTaskCollapsed(true)}
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
        <div
          id="taskDisplay"
          className=" flex min-h-0 min-w-0 flex-1 flex-col"
        >
          <div className="sticky  mb-3 flex shrink-0 items-start gap-3">
            <div className="min-w-0 flex-1">
              <FilterBar
                filters={filters}
                setFilters={setFilters}
                sort={sort}
                setSort={setSort}
                statuses={statuses}
                priorities={priorities}
              />
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto ">
            <TaskDisplay
              tasks={displayedTasks}
              onEdit={handleEdit}
              onTaskChanged={loadFilteredTasks}
              highlightedTaskId={highlightedTaskId}
              isSelectMode={isSelectMode}
              selectedTaskIds={selectedTaskIds}
              onToggleSelection={handleToggleTaskSelection}
              viewMode={viewMode}
              gridColumns={gridColumns}
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
                setScrollToTaskId(taskId);
                setTimeout(() => {
                  setHighlightedTaskId(null);
                }, 1200);
              }}
            />
          )}
          {isDeleteModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
              onClick={() => {
                if (!isDeleting) {
                  setIsDeleteModalOpen(false);
                }
              }}
            >
              <div
                className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="mb-2 text-lg font-bold">
                  Delete selected tasks?
                </h3>

                <p className="mb-1 text-sm text-gray-600">
                  You are about to delete {selectedTaskIds.length}{" "}
                  {selectedTaskIds.length === 1 ? "task" : "tasks"}.
                </p>

                <p className="mb-6 text-sm text-gray-500">
                  This action cannot be undone.
                </p>

                <div className="flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(false)}
                    disabled={isDeleting}
                    className="rounded-md border px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleDeleteSelected}
                    disabled={isDeleting}
                    className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    {isDeleting ? "Deleting..." : "Delete "}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TaskArea;
