"use client";

import { useState } from "react";
import FilterBar from "../FilterBar/filterBar";
import TaskDisplay from "../TaskDisplay/taskDisplay";
import { filterTasks, TaskFilters } from "@/utils/renders/filterTasks";

type Task = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  due_date: string;
  status: string;
  priority: string;
};

type TaskAreaProps = {
  tasks: Task[];
  statuses: string[];
  priorities: string[];
};

const TaskArea = ({
  tasks,
  statuses,
  priorities,
}: TaskAreaProps) => {
  const [filters, setFilters] = useState<TaskFilters>({
    search: "",
    status: "",
    priority: "",
    due_date: "",
  });

  const filteredTasks = filterTasks(tasks, filters);

  return (
    <>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        statuses={statuses}
        priorities={priorities}
      />

      <TaskDisplay tasks={filteredTasks} />
    </>
  );
};

export default TaskArea;
