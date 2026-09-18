"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
type TaskFilters = {
  search: string;
  status: string;
  priority: string;
  due_date: string;
};

type SideBarProps = {
  filters: TaskFilters;
  setFilters: Dispatch<SetStateAction<TaskFilters>>;
  onToggleAddTask: () => void;

  isSelectMode: boolean;
  onToggleSelectMode: () => void;
  selectedCount: number;
  onDeleteSelected: () => void;
  viewMode: "grid" | "list";
  setViewMode: Dispatch<SetStateAction<"grid" | "list">>;

  gridColumns: 1 | 2 | 3 | 4;
  setGridColumns: Dispatch<SetStateAction<1 | 2 | 3 | 4>>;
};

const SideBar = ({
  filters,
  setFilters,
  onToggleAddTask,
  isSelectMode,
  onToggleSelectMode,
  selectedCount,
  onDeleteSelected,
  viewMode,
  setViewMode,
  gridColumns,
  setGridColumns,
}: SideBarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // {logout logic}
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
      return;
    }

    router.push("/login");
    router.refresh();
  };

  return (
    <aside
      className={`flex h-dvh flex-col bg-gray-950 py-5 text-white transition-all duration-300 ${
        isCollapsed ? "w-20 px-3" : "w-64 px-4"
      }`}
    >
      {/* Header */}
      <div
        className={`mb-8 flex items-center ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!isCollapsed && (
          <div>
            <h1 className="text-2xl font-bold tracking-tight">TaskFlow</h1>
            <p className="text-xs text-gray-500">Workspace</p>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="rounded-lg p-2 hover:bg-gray-900"
        >
          {isCollapsed ? (
            <Image
              src="/right-arrow(1).png"
              alt="collapse"
              width="18"
              height="18"
            ></Image>
          ) : (
            <Image
              src="/left-arrow(1).png"
              alt="right-arrow"
              width="18"
              height="18"
            ></Image>
          )}
        </button>
      </div>

      {/* Add Task */}
      <button
        type="button"
        title="Add Task"
        onClick={onToggleAddTask}
        className={`mb-7 flex items-center rounded-lg bg-white py-3 font-semibold text-black transition hover:bg-gray-200 ${
          isCollapsed ? "justify-center px-2" : "justify-center gap-2 px-4"
        }`}
      >
        <Image src="/plus(1).png" alt="add-task" width="18" height="18"></Image>

        {!isCollapsed && <span>Add Task</span>}
      </button>

      {/* Search */}
      <div className="mb-5">
        {isCollapsed ? (
          <button
            type="button"
            title="Search"
            onClick={() => setIsCollapsed(false)}
            className="flex w-full justify-center rounded-lg p-3 hover:bg-gray-900"
          >
            <Image
              src="/search.png"
              alt="search"
              width="18"
              height="18"
            ></Image>
          </button>
        ) : (
          <div className="flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2">
            <Image
              src="/search.png"
              alt="search"
              width="18"
              height="18"
            ></Image>

            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  search: e.target.value,
                })
              }
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-600"
            />
          </div>
        )}
      </div>

      {/* Task Actions */}
      <div className="mb-7">
        {!isCollapsed && (
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-600">
            Tasks
          </p>
        )}

        <div className="space-y-1">
          <button
            type="button"
            title={isSelectMode ? "Cancel selection" : "Select Tasks"}
            onClick={onToggleSelectMode}
            className={`flex w-full items-center rounded-lg py-2 text-sm transition ${
              isSelectMode
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-gray-900 hover:text-white"
            } ${isCollapsed ? "justify-center px-2" : "gap-3 px-3"}`}
          >
            <Image
              src="/selection.png"
              alt="selection"
              width="18"
              height="18"
            ></Image>

            {!isCollapsed && (
              <span>{isSelectMode ? "Cancel Selection" : "Select Tasks"}</span>
            )}
          </button>
          {isSelectMode && !isCollapsed && (
            <p className="mt-2 px-3 text-xs text-gray-400">
              {selectedCount} selected
            </p>
          )}
          <button
            type="button"
            title="Delete Selected"
            onClick={onDeleteSelected}
            disabled={selectedCount === 0}
            className={`flex w-full items-center rounded-lg py-2 text-sm transition ${
              selectedCount === 0
                ? "text-gray-700"
                : "text-gray-400 hover:bg-gray-900 hover:text-red-400"
            } ${isCollapsed ? "justify-center px-2" : "gap-3 px-3"}`}
          >
            <Image
              src="/delete.png"
              alt="add-task"
              width="18"
              height="18"
              className={selectedCount === 0 ? "opacity-30" : "opacity-100"}
            ></Image>

            {!isCollapsed && <span>Delete</span>}
          </button>
        </div>
      </div>

      {/* Display */}
      <div>
        {!isCollapsed && (
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-600">
            View
          </p>
        )}

        {isCollapsed ? (
          <div className="space-y-1">
            <button
              type="button"
              title="Grid View"
              onClick={() => setViewMode("grid")}
              className="flex w-full justify-center rounded-lg p-3 text-gray-300 hover:bg-gray-900"
            >
              <Image src="/grid.png" alt="grid" width="18" height="18"></Image>
            </button>

            <button
              type="button"
              title="List View"
              onClick={() => setViewMode("list")}
              className="flex w-full justify-center rounded-lg p-3 text-gray-300 hover:bg-gray-900"
            >
              <Image src="/list.png" alt="list" width="18" height="18"></Image>
            </button>
          </div>
        ) : (
          <div className="rounded-xl bg-gray-900 p-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  viewMode === "grid"
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                Grid
              </button>

              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  viewMode === "list"
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                List
              </button>
            </div>

            {viewMode === "grid" && (
              <div className="mt-3">
                <p className="mb-2 text-xs text-gray-500">Grid columns</p>

                <div className="grid grid-cols-4 gap-1">
                  <button
                    type="button"
                    onClick={() => setGridColumns(1)}
                    className={`rounded-md px-2 py-1 text-xs transition ${
                      gridColumns === 1
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:bg-gray-800"
                    }`}
                  >
                    1
                  </button>

                  <button
                    type="button"
                    onClick={() => setGridColumns(2)}
                    className={`rounded-md px-2 py-1 text-xs transition ${
                      gridColumns === 2
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:bg-gray-800"
                    }`}
                  >
                    2
                  </button>

                  <button
                    type="button"
                    onClick={() => setGridColumns(3)}
                    className={`rounded-md px-2 py-1 text-xs transition ${
                      gridColumns === 3
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:bg-gray-800"
                    }`}
                  >
                    3
                  </button>

                  <button
                    type="button"
                    onClick={() => setGridColumns(4)}
                    className={`rounded-md px-2 py-1 text-xs transition ${
                      gridColumns === 4
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:bg-gray-800"
                    }`}
                  >
                    4
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom section */}
      <div className="mt-auto border-t border-gray-800 pt-4">
        <button
          type="button"
          title="Logout"
          onClick={handleLogout}
          className={`flex w-full items-center rounded-lg py-2 text-sm text-gray-400 hover:bg-gray-900 hover:text-white ${
            isCollapsed ? "justify-center px-2" : "gap-3 px-3"
          }`}
        >
          {/* logout icon */}
          <span>↪</span>

          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
