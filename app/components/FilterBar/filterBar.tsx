"use client"

import {TaskFilters} from "@/utils/renders/filterTasks";
import {Dispatch, SetStateAction} from "react";

  type FilterBarProps = {
    filters: TaskFilters;
    setFilters: Dispatch<SetStateAction<TaskFilters>>;
    statuses: string[];
    priorities: string[];
  };

  const FilterBar = ({ filters, setFilters, statuses, priorities }: FilterBarProps) => {
    type FilterBarProps = {
      filters: TaskFilters;
      setFilters: Dispatch<SetStateAction<TaskFilters>>;
      statuses: string[];
      priorities: string[];
    };

    return (
      <div className="mb-6 rounded-xl bg-gray-200 p-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <select
        name="status"
        defaultValue=""
        className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
      >
        <option value="">All statuses</option>

        {statuses.map((status: string) => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>

      <select
        name="priority"
        defaultValue=""
        className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
        onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
     >
        <option value="">All priorities</option>

        {priorities.map((priority: string) => (
          <option key={priority} value={priority}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </option>
        ))}
      </select>


      <input
        type="date"
        name="due_date"
        className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
      onChange={(e) => setFilters({ ...filters, due_date: e.target.value })}
      />
    </div>
  );
};

export default FilterBar;