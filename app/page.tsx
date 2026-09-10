import AddTask from "./components/AddTask/addTask";
import FilterBar from "./components/FilterBar/filterBar";
import TaskCard from "./components/TaskCard/taskCard";
import { getTaskDetails } from "@/utils/services/getTaskDetails";

import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase =await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("id, created_at, title, description, due_date, status, priority");
  console.log("data", data);
  console.log("error", error);
  return (
    <div className="flex flex-row m-10">
      <div id="addTaskContainer" className="flex ">
        <AddTask></AddTask>
      </div>
      <div id="taskDisplay" className="flex flex-col ml-10 w-full">
        <FilterBar></FilterBar>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.map((task) => (
            <TaskCard key={task.id} task={task}></TaskCard>
          ))}
        </div>
      </div>
    </div>
  );
}
