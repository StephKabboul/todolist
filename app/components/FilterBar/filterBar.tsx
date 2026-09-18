"use client";

import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
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

type FilterBarProps = {
  filters: TaskFilters;
  setFilters: Dispatch<SetStateAction<TaskFilters>>;
  sort: TaskSort;
  setSort: Dispatch<SetStateAction<TaskSort>>;
  statuses: string[];
  priorities: string[];
};

const FilterBar = ({
  filters,
  setFilters,
  sort,
  setSort,
  statuses,
  priorities,
}: FilterBarProps) => {
  const handleReset = () => {
    setFilters({
      search: "",
      status: "",
      priority: "",
      due_date: "",
    });

    setSort({
      field: "created_at",
      direction: "desc",
    });
  };
  //className="mb-5 flex items-center gap-3 rounded-xl bg-gray-200 p-4"
  return (
    <div className="flex items-center gap-3 rounded-xl mb-6 ">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_auto] rounded-xl gap-2">
        {/* Status */}
        <select
          name="status"
          value={filters.status}
          className="rounded-lg border border-gray-300 bg-gray-200 px-3 py-2 outline-none focus:border-blue-500"
          onChange={(e) =>
            setFilters({
              ...filters,
              status: e.target.value,
            })
          }
        >
          <option value="">All statuses</option>

          {statuses.map((status: string) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>

        {/* Priority */}
        <select
          name="priority"
          value={filters.priority}
          className="rounded-lg border border-gray-300 bg-gray-200 px-3 py-2 outline-none focus:border-blue-500"
          onChange={(e) =>
            setFilters({
              ...filters,
              priority: e.target.value,
            })
          }
        >
          <option value="">All priorities</option>

          {priorities.map((priority: string) => (
            <option key={priority} value={priority}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </option>
          ))}
        </select>

        {/* Due Date */}
        <input
          type="date"
          name="due_date"
          value={filters.due_date}
          className="rounded-lg border border-gray-300 bg-gray-200 px-3 py-2 outline-none focus:border-blue-500"
          onChange={(e) =>
            setFilters({
              ...filters,
              due_date: e.target.value,
            })
          }
        />

        {/* Sort */}
        <select
          value={`${sort.field}-${sort.direction}`}
          className="rounded-lg border border-gray-300 bg-gray-200 px-3 py-2 outline-none focus:border-blue-500"
          onChange={(e) => {
            console.log("DROPDOWN CHANGED:", e.target.value);

            const [field, direction] = e.target.value.split("-");

            setSort({
              field: field as TaskSort["field"],
              direction: direction as TaskSort["direction"],
            });
          }}
        >
          <option value="created_at-desc">Newest</option>
          <option value="created_at-asc">Oldest</option>

          <option value="title-asc">A → Z</option>
          <option value="title-desc">Z → A</option>

          <option value="due_date-asc">Due date: Closest</option>
          <option value="due_date-desc">Due date: Farthest</option>

          <option value="status-asc">Not Started → Ongoing → Done</option>
          <option value="status-desc">Done → Ongoing → Not Started</option>

          <option value="priority-asc">
            Not Urgent → Urgent → Very Urgent
          </option>
          <option value="priority-desc">
            Very Urgent → Urgent → Not Urgent
          </option>
        </select><button
        type="button"
        onClick={handleReset}
        className="shrink-0 rounded-lg border border-gray-300 bg-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-300 focus:border-blue-500"
      >
        Clear
      </button>
      </div>
      
      
    </div>
  );
};

export default FilterBar;
