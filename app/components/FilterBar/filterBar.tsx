"use client";

import { Dispatch, SetStateAction } from "react";

type TaskFilters = {
  search: string;
  status: string;
  priority: string;
  due_date: string;
};

type FilterBarProps = {
  filters: TaskFilters;
  setFilters: Dispatch<SetStateAction<TaskFilters>>;
  statuses: string[];
  priorities: string[];
};

const FilterBar = ({
  filters,
  setFilters,
  statuses,
  priorities,
}: FilterBarProps) => {
  return (
    <div className="grid grid-cols-4 mb-6 rounded-xl bg-gray-200 p-4 gap-2">
      {/* Search */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={filters.search}
        className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        onChange={(e) =>
          setFilters({
            ...filters,
            search: e.target.value,
          })
        }
      />

      {/* Status */}
      <select
        name="status"
        value={filters.status}
        className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
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
        className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
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
        className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        onChange={(e) =>
          setFilters({
            ...filters,
            due_date: e.target.value,
          })
        }
      />
    </div>
  );
};

export default FilterBar;
