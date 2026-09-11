import AddTask from "./components/AddTask/addTask";
import TaskArea from "./components/TaskArea/taskArea";
import { getEnumValues } from "@/utils/services/getEnumValues";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("id, created_at, title, description, due_date, status, priority");

  const statuses = await getEnumValues("status");
  const priorities = await getEnumValues("priority");
  
  return (
    <div className="flex flex-row m-10">
      <div id="addTaskContainer" className="flex ">
        <AddTask></AddTask>
      </div>
      <div id="taskDisplay" className="flex flex-col ml-10 w-full">
        <TaskArea
          tasks={data ?? []}
          statuses={statuses}
          priorities={priorities}
        ></TaskArea>
      </div>
    </div>
  );
}
